import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  Component,
  DoCheck,
  OnInit,
  ViewChild
} from '@angular/core';
import {Vis3dGraphDirective} from './vis3dgraph.directive';
import {parseString, xml2js} from 'xml2js';
import {VisualDataService} from '../services/visual-data.service';
import {styles} from '../services/resource-constants';
import * as _ from 'underscore';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Vis2dGraphDirective} from './vis2dgraph.directive';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css'],
  animations: [
    trigger('detailState', [
      state('hidden', style({
        // width: '100px',
        // height: '100px',
        transform: 'translateX(0) scale(0)'
      })),
      state('selected1', style({
        // width: '150px',
        // height: '150px',
        transform: 'translateX(0) scale(1)'
      })),
      state('selected2', style({
        // width: '150px',
        // height: '150px',
        transform: 'translateX(0) scale(1)'
      })),
      transition('* => selected1', [
        animate(100, style({
          transform: 'translateX(0) scale(0)'
        })),
        animate(200)
      ]),
      transition('* => selected2', [
        animate(100, style({
          transform: 'translateX(0) scale(0)'
        })),
        animate(200)
      ]),
    ])
    ]
})
export class VisualsComponent
  implements
    // AfterViewInit,
    // AfterViewChecked,
    AfterContentInit,
    // AfterContentChecked,
    // OnDestroy,
    OnInit,
    DoCheck {

  public showPerspective: boolean;
  public showSMT: boolean;
  public showTEST: boolean;
  public display3d: boolean;
  public noData: boolean;
  public styleList = styles;
  public isDot: boolean;
  public testData: any;
  public currentView: string;
  public nextGraph: string;
  public isXmlLoaded: boolean;
  public selectedData: object;
  public isSelected: boolean;
  public detailState: string;

  @ViewChild(Vis3dGraphDirective) private _3dGraph: Vis3dGraphDirective;
  @ViewChild(Vis2dGraphDirective) private _2dGraph: Vis2dGraphDirective;

  constructor(private vdService: VisualDataService) {
    this.isXmlLoaded = this.vdService.isLoaded();
    this.noData = false;
    this.nextGraph = '2D';
    this.currentView = 'A';
    this.showPerspective = false;
    this.showTEST = true;
    this.showSMT = true;
    this.display3d = true;
    this.detailState = 'hidden';
  }

  public ngOnInit() {
    // this.graphData = new Array(6).fill(0).map(_ => new Array(6).fill(0).map(_ => {return {value: Math.floor(Math.random() * 100)}}));
    // console.log(this.selectedData);
    console.log('Visual Component: OnInit');
  }

  ngDoCheck() {
    this.vdService.selectedData.subscribe((data: object) => {
        if (!_.isEqual(this.selectedData, data)) {
          if (JSON.stringify(data) !== '{}') {
            this.isSelected = true;
            this.toggleDetail();
            this.selectedData = data;
          }
        }
    });
  }

  ngAfterContentInit() {
    console.log('Visual Component: AfterContentInit');
  }
  //
  // ngAfterContentChecked() {
  //   console.log('Visual Component: AfterContentChecked');
  // }
  //
  // ngAfterViewInit() {
  //   console.log('Visual Component: AfterViewInit');
  // }
  //
  // ngAfterViewChecked() {
  //   console.log('Visual Component: AfterViewChecked');
  // }
  //
  // ngOnDestroy() {
  //   console.log('Visual Component: OnDestroy');
  // }

  toggleDetail() {
    switch (this.detailState) {
      case 'selected1': {
        this.detailState = 'selected2';
        break;
      }
      case 'selected2': {
        this.detailState = 'selected1';
        break;
      }
      default: {
        this.detailState = 'selected1';
        break;
      }
    }
    console.log('Infostate: ' + this.detailState);
  }

  switchGraph() {
    this.display3d ?
      (this.display3d = false, this.nextGraph = '3D') :
      (this.display3d = true, this.nextGraph = '2D');
  }

  updateData(resource: string) {
    console.log('No Data: ' + this.noData);
    console.log('Show 3D: ' + this.display3d);

    this.noData = false;
    this.showSMT = true;
    this.showTEST = true;

    if (!this.display3d) {
      // this._2dGraph.createGraph(this.vdService.getItems());
      console.log('Update Data: 2D');
    }

    if (this.display3d) {
      switch (resource) {
        case 'A': {
          this._3dGraph.createGraph(this.vdService.getData(resource));
          this.currentView = resource;
          break;
        }
        case 'B': {
          this._3dGraph.createGraph(this.vdService.getData(resource));
          this.currentView = resource;
          break;
        }
        default: {
          this._3dGraph.createGraph(this.vdService.getData('A', 'SMT'));
          console.log('Should not happen');
          break;
        }
      }
      this._3dGraph.updateOptions( this.showPerspective, 0.5, undefined);
      console.log('Update Data: 3D');
    }
  }

  changeStyle(style: string) {
    this._3dGraph.updateStyle(style);
    switch (style) {
      case 'dot': {
        this.isDot = true;
        break;
      }
      default: {
        this.isDot = false;
        break;
      }
    }
  }

  isLastSelected(resource: string): boolean {
    let returnValue: boolean;
    if (this.showSMT !== this.showTEST) {
      switch (resource) {
        case 'SMT': {
          this.showSMT ? returnValue = true : returnValue = false;
          break;
        }
        case 'TEST': {
          this.showTEST ? returnValue = true : returnValue = false;
          break;
        }
      }
      return returnValue;
    }
    return false;
  }

  togglePerspective() {
    this._3dGraph.updateOptions(this.showPerspective);
  }

  toggleView() {
    console.log('Show SMT: ' + this.showSMT);
    console.log('Show TEST: ' + this.showTEST);

    if (!this.showSMT && !this.showTEST) {
      this.noData = true;
    } else {
      this.noData = false;
    }

    console.log('No Data: ' + this.noData);

    if (this.showSMT) {
      this._3dGraph.updateOptions( this.showPerspective, 0.5, undefined);
    }
    switch (this.currentView) {
      case 'A': {
        if (this.showSMT || this.showTEST) {
          if (this.showTEST && this.showSMT) {
            this._3dGraph.createGraph(this.vdService.getData('A'));
          } else if (this.showSMT && !this.showTEST) {
            this._3dGraph.createGraph(this.vdService.getData('A', 'SMT'));
          } else {
            this._3dGraph.updateOptions( this.showPerspective, 2.5, undefined);
            this._3dGraph.createGraph(this.vdService.getData('A', 'TEST'));
          }
        }
        break;
      }
      case 'B': {
        if (this.showSMT || this.showTEST) {
          if (this.showTEST && this.showSMT) {
            this._3dGraph.createGraph(this.vdService.getData('B'));
          } else if (this.showSMT && !this.showTEST) {
            this._3dGraph.createGraph(this.vdService.getData('B', 'SMT'));
          } else {
            this._3dGraph.updateOptions( this.showPerspective, 2.5, undefined);
            this._3dGraph.createGraph(this.vdService.getData('B', 'TEST'));
          }
        }
        break;
      }
      default: {
        this._3dGraph.createGraph(this.vdService.getData('A', 'SMT'));
        console.log('Should not happen');
        break;
      }
    }
  }
}
