import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import * as colors from '../services/colors';
import {VisualDataService} from '../services/visual-data.service';

declare var vis: any;

@Directive({
  selector: '[appVis3DGraph]'
})
export class Vis3dGraphDirective implements OnInit, OnDestroy {

  public DEFAULT_OPTIONS = {
    width: '100%',
    height: '500px',
    style: 'bar',
    backgroundColor: {
      fill: colors.graph_fill,
      stroke: colors.graph_stroke,
      strokeWidth: 1
    },
    showPerspective: false,
    showGrid: false,
    showShadow: true,
    keepAspectRatio: true,
    tooltip: function (point) {
      // parameter point contains properties x, y, z, and graphData
      // graphData is the original object passed to the point constructor
      return 'POT: <b>' + point.z + '</b> seconds<br>'
        + 'Day of the Week: <b>' + point.data.day + '</b><br>'
        + 'Resource: <b>' + point.data.resource + '</b>';
    },
    tooltipStyle: {
      line: {
        borderLeft: '1px solid ' + colors.graph_tt_bg
      },
      dot: {
        border: '5px solid ' + colors.graph_tt_dot
      }
    },
    verticalRatio: 0.5,
    xCenter: '50%',
    yCenter: '50%',
    xValueLabel: function (x) { switch (x) {
      case 1: {
        return 'Monday';
      }
      case 2: {
        return 'Tuesday';
      }
      case 3: {
        return 'Wednesday';
      }
      case 4: {
        return 'Thursday';
      }
      case 5: {
        return 'Friday';
      }
      case 6: {
        return 'Saturday';
      }
      default: {
        return 'someDay';
      }
    }  },
    yValueLabel: function (y) { switch (y) {
      case 1: {
        return 'SMT';
      }
      case 3: {
        return 'TEST';
      }
      default: {
        return '';
      }
    }  },
    zMin: 0,
    zMax: 60000,
    yMin: 0.5,
    // yMax: 3.5,
    zLabel: 'POT',
    yLabel: '',
    xLabel: '',
    yBarWidth: 0.5,
    xBarWidth: 0.5,
    onclick: (point) => {
      this.vdService.setSelectedData(point.id);
      },
    axisColor: colors.graph_axis,
    cameraPosition: { horizontal: -0.3, vertical: 0.8, distance: 2.3 }
  };

  private _graph: any;

  constructor(private elementRef: ElementRef, private vdService: VisualDataService) {
  }

  ngOnDestroy(): void {
    console.log('3D Graph OnDestroy');
  }

  ngOnInit(): void {
    const savedState = this.vdService.getSaveState();
    savedState.week === '' ?
      this.createGraph(this.vdService.getData('A')) :
      this.createGraph(this.vdService.getData(savedState.week, savedState.resource));
    savedState.resource === 'TEST' ?
      this.updateOptions( false, 2.5, undefined) :
      this.updateOptions( false, 0.5, undefined);
    console.log('3D Graph OnInit');
  }

  public createGraph(graphData: any) {
    const container = this.elementRef.nativeElement;

    if (!this._graph) {
      this._graph = new vis.Graph3d(container, graphData, this.DEFAULT_OPTIONS);
      // console.log('Create Default Graph');
    } else {
      // console.log('Create Changed Graph');
      this._graph.setData(graphData);
    }
    // console.log(typeof graphData);
    // console.log('Drawing Graph');
    this._graph.redraw();
  }

  private _generateData() {
    // const graphData = [];
    // this.graphData.forEach((xValue, x) => graphData.push(...xValue.map((yValue, y) => {
    //   return { x, y, z: yValue.value };
    // })));
  }

  public updateStyle(style: string) {
    const options = {
      style: style
    };

    this._graph.setOptions(options);
  }

  public updateOptions(perspective?: boolean, yMin?: number, yMax?: number) {
    const options = {
      showPerspective: perspective,
      yMin: yMin,
      yMax: yMax
    };
    this._graph.setOptions(options);
}
}
