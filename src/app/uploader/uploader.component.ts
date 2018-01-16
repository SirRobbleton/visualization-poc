import {
  AfterContentInit, AfterViewChecked, Component, DoCheck, Injectable, OnChanges, OnInit,
  SimpleChanges
} from '@angular/core';
import {parseString, xml2js} from 'xml2js';
import {VisualDataService} from '../services/visual-data.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit, DoCheck {

  @Injectable() private currentView: string;

  private optimizerInputXML: string;
  private optimizerInputJSON: string;
  private displayXML: boolean;
  private isXmlLoaded: boolean;

  constructor(private vdService: VisualDataService) {
  }

  ngOnInit() {
    this.displayXML = true;
  }

  ngDoCheck() {
    if (this.vdService.isLoaded()) {
      this.isXmlLoaded = true;
      this.optimizerInputXML = this.vdService.getOptimizerInput('xml');
      // console.log('DoCheck: Uploader');
    }
  }

  openFile(xmlFile) {
    const fileReader = new FileReader();
    fileReader.readAsText(xmlFile.target.files[0]);
    fileReader.onloadend = (e: object) => {
      parseString(fileReader.result, (err, result) => {
        const jsonData = JSON.stringify(result, undefined, 2);
        const segments = result.optimizerInputData.planningPeriod[0].planningPeriodSegments[0];
        const xmlData = fileReader.result;

        this.vdService.passJSON(segments);
        this.vdService.setOptimizerInput('json', jsonData);
        this.vdService.setOptimizerInput('xml', xmlData);
      });
    };
  }

  updateFormat(format: string) {
    switch (format) {
      case 'json': {
        this.optimizerInputJSON = this.vdService.getOptimizerInput('json');
        this.displayXML = false;
        break;
      }
      case 'xml': {
        this.optimizerInputXML = this.vdService.getOptimizerInput('xml');
        this.displayXML = true;
        break;
      }
      default: {
        console.log('This should not happen: No Format');
      }
    }
  }
}
