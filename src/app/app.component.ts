import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Vis3dGraphDirective} from './visuals/vis3dgraph.directive';
import {parseString, xml2js} from 'xml2js';
import * as jp from 'jsonpath';
import * as colors from './services/colors';

import {TestData} from './services/data.model';
import {WarehouseDataService} from './services/warehouse-data.service';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  // selector: '.app-root'
  // selector: [app-root]
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styles: [``]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  mobHeight: number;
  mobWidth: number;

  ngOnInit() {}

  constructor(private elementRef: ElementRef, private dataService: DataService) {
    this.mobHeight = (window.screen.height);
    this.mobWidth = (window.screen.width);
    console.log(this.mobHeight);
    console.log(this.mobWidth);
    this.dataService.defineDeviceDims(this.mobWidth, this.mobHeight);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = colors.app_bg;
  }

}
