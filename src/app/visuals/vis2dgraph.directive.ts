import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import * as colors from '../services/colors';
import {VisualDataService} from '../services/visual-data.service';

declare var vis: any;

@Directive({
  selector: '[appVis2DGraph]'
})
export class Vis2dGraphDirective implements OnInit, OnDestroy {

  public DEFAULT_OPTIONS = {
    width:  '100%',
    graphHeight: '400px',
    style: 'bar',
    stack: false,
    barChart: {
      width: 50,
      align: 'center', // align: left, center, right
      sideBySide: true
    },
    drawPoints: false,
    dataAxis: {
      icons: false,
      left: {
        range: {
          min: 0
        },
        title: {
          text: 'POT'
        }
      }
    },
    orientation: 'top',
    // configure: true,
    clickToUse: true
  };

  private _graph: any;

  constructor(private elementRef: ElementRef, private vdService: VisualDataService) {
  }

  ngOnDestroy(): void {
    console.log('2D Graph OnDestroy');
  }

  ngOnInit(): void {
    const weekPlan2D = [
      {x: 1, y: 30, group: 0},
      {x: 2, y: 10, group: 0},
      {x: 3, y: 15, group: 0},
      {x: 1, y: 30, group: 1},
      {x: 2, y: 65, group: 1},
      {x: 3, y: 30, group: 1}
    ];
    // const savedState = this.vdService.getSaveState();
    // const weekPlan3D = this.vdService.getData(savedState.week, savedState.resource);
    // for (const day of weekPlan3D) {
    //   const newDay = {
    //     x: day.x,
    //     y: day.z,
    //     group: day.y
    //   };
    //   weekPlan2D.push(newDay);
    // }
    this.createGraph(weekPlan2D);
    console.log('2D Graph OnInit');
  }

  public createGraph(graphData: any) {
    const container = this.elementRef.nativeElement;

    if (!this._graph) {
      this._graph = new vis.Graph2d(container, graphData, this.DEFAULT_OPTIONS);
      // console.log('Create Default Graph');
    } else {
      // console.log('Create Changed Graph');
      this._graph.setItems(graphData);
    }
    // console.log(typeof graphData);
    // console.log('Drawing Graph');
    this._graph.redraw();
  }
}
