import {
  AfterViewInit, Component, DoCheck, ElementRef, NgZone, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import {WarehouseDataService} from '../services/warehouse-data.service';
import {Warehouse} from '../services/warehouse.model';
import * as resources from '../services/resource-constants';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [
    trigger('infoState', [
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
        animate(300)
      ]),
      transition('* => selected2', [
        animate(100, style({
          transform: 'translateX(0) scale(0)'
        })),
        animate(300)
      ]),
    ])
    ]
})
export class MapComponent implements OnInit, OnDestroy, DoCheck, AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  @ViewChild('detailContainer') detailContainer: ElementRef;

  public isLoggedIn;

  public initCounter = 0;

  public infoState = 'hidden';

  private chart: AmChart;

  public selectedWh: Warehouse;
  public isWhSelected = false;
  public isOld = false;
  public isDataLoaded = false;

  public warehouseSVG = resources.warehouseSVG;
  public truck1SVG = resources.truck1SVG;
  public truck2SVG = resources.truck2SVG;
  public truck3SVG = resources.truck3SVG;

  public results = [];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  public view = [];
  public gradient = false;
  public label = 'Total (sqft)';

  public config = {
    'type': 'map',
    'theme': 'dark',
    'projection': 'winkel3',
    'linesSettings': {
      'color': '#153094',
      'alpha': 0.4
    },
    'imagesSettings': {
      'color': '#153094',
      'rollOverColor': '#142069',
      'selectedColor': '#142069',
      'selectedScale': 1.2,
      'pauseDuration': 0.2,
      'animationDuration': 100,
      'adjustAnimationSpeed': true,
      'labelPosition': 'bottom'
    },

    /**
     * Data Provider
     * The images contains pie chart information
     * The handler for `positionChanged` event will take care
     * of creating external elements, position them and create
     * Pie chart instances in them
     */
    'dataProvider': {
      'map': 'singaporeHigh',
      // 'lines': [ {
      //   'id': 'line1',
      //   'arc': -0.55,
      //   'alpha': 0.5,
      //   'latitudes': [ 1.32, 1.32 ],
      //   'longitudes': [ 103.685, 103.785 ]
      // }],
      'images': [
        // {
        //   'svgPath': this.truckSVG,
        //   // 'color': '#7e90b1',
        //   'alpha': 1,
        //   'animateAlongLine': true,
        //   'positionOnLine': 1,
        //   'lineId': 'line1',
        //   'flipDirection': false,
        //   'loop': true,
        //   'scale': 0.05,
        //   'positionScale': 1.5,
        //   'selectable': true,
        //   'bringForwardOnHover': true,
        // }
        // {
        //   'title': '',
        //   'latitude': 1.34,
        //   'longitude': 103.81,
        //   'width': 140,
        //   'height': 50,
        //   'pie': {
        //     'type': 'pie',
        //     'pullOutRadius': 10,
        //     'labelRadius': 0,
        //     'dataProvider': [{
        //       'category': 'Free',
        //       'value': 1200
        //     }, {
        //       'category': 'Used',
        //       'value': 500
        //     }],
        //     'labelText': '',
        //     'valueField': 'value',
        //     'titleField': 'category',
        //   }
        // },
        // {
        //   'latitude': 1.32,
        //   'longitude': 103.79,
        //   'imageURL': 'http://pluspng.com/img-png/warehouse-group-vector-png--700.png',
        //   // 'svgPath': this.warehouseSVG,
        //   // 'scale': 1,
        //   'width': 50,
        //   'height': 50,
        //   'balloonText': 'Warehouse A',
        //   'zoomLevel': 3,
        //   'label': '',
        //   'selectable': true
        // },
        // {
        //   'title': '',
        //   'latitude': 1.34,
        //   'longitude': 103.70,
        //   'width': 140,
        //   'height': 80,
        //   'pie': {
        //     'type': 'pie',
        //     'pullOutRadius': 10,
        //     'labelRadius': 0,
        //     'dataProvider': [{
        //       'category': 'Free',
        //       'value': 1200
        //     }, {
        //       'category': 'Used',
        //       'value': 500
        //     }],
        //     'labelText': '',
        //     'valueField': 'value',
        //     'titleField': 'category'
        //   }
        // }
      ]
    }
  };

  constructor(private router: Router,
              private AmCharts: AmChartsService,
              private whService: WarehouseDataService,
              private authService: AuthService) {
    console.log('MAP: Constructor');
    // this.whService.finishedLoading.subscribe((value: boolean) => {
    //   if (value) {
    //     this.isDataLoaded = true;
    //     this.refreshWarehouses();
    //   }
    // });
    // this.whService.getFromDatabase();
  }

  ngOnInit() {
    this.whService.finishedLoading.subscribe(
      (value: boolean) => {
        if (!value) {
          this.router.navigateByUrl('auth');
        }
      }
    );
    this.authService.loginSuccessful.subscribe(
      (value: string) => {
        value === 'success' ? this.isLoggedIn = true : this.isLoggedIn = false;
      }
    );
    this.refreshWarehouses();
    console.log('MAP: OnInit');
    this.whService.areaChartDim.subscribe((dims: any) => {
      if (dims.width !== this.view[0]) {
        if (dims.width < 335) {
          this.view = [dims.width, dims.height];
        } else {
          this.view = [dims.width + dims.width * 0.5, dims.height];
        }
      }
    });
  }

  ngAfterViewInit() {
    this.addListener();
    console.log('MAP: AfterViewInit');
  }

  ngDoCheck() {
  }

  // ngAfterViewInit() {
  //   console.log('MAP: AfterViewInit');
  //
  //   this.AmCharts.addListener(this.chart, 'positionChanged', (e) => {
  //     // Do stuff when the event happens
  //     const map = e.chart;
  //
  //     // go through all of the images
  //     for (let x = 0; x < map.dataProvider.images.length; x++) {
  //
  //       // get MapImage object
  //       const image = map.dataProvider.images[x];
  //
  //       // Is it a Pie?
  //       // if (image.pie === undefined) {
  //       //   continue;
  //       // }
  //
  //       // create id
  //       if (image.id === undefined) {
  //         image.id = 'amcharts_pie_' + x;
  //       }
  //       // Add theme
  //       // if ('undefined' === typeof image.pie.theme) {
  //       //   image.pie.theme = map.theme;
  //       // }
  //
  //       // check if it has corresponding HTML element
  //       // if ('undefined' === typeof image.externalElement) {
  //       //   image.externalElement = this.createCustomMarker(image);
  //       // }
  //
  //       // reposition the element accoridng to coordinates
  //       const xy = map.coordinatesToStageXY(image.longitude, image.latitude);
  //       image.externalElement.style.top = xy.y + 'px';
  //       image.externalElement.style.left = xy.x + 'px';
  //       image.externalElement.style.marginTop = Math.round(image.height / -2) + 'px';
  //       image.externalElement.style.marginLeft = Math.round(image.width / -2) + 'px';
  //     }
  //     console.log('MAP: positionChanged');
  //   });
  // }

  ngOnDestroy() {
    this.destroyMap();
    console.log('MAP: OnDestroy');
  }

  public addListener() {
    this.AmCharts.addListener(this.chart, 'clickMapObject', (e) => {
      const selectedWh = e.mapObject.balloonText;
      this.setSelectedWarehouse(selectedWh);
    });
  }

  public setSelectedWarehouse(whName: string, event?) {
    this.isWhSelected = true;
    this.transformInfo();
    if (this.initCounter === 0) {
      this.view = [750, 267];
      this.initCounter = 1;
    }
    let selected: Warehouse;
    if (whName !== '') {
      selected = this.whService.getWarehouseByName(whName);
    } else {
      selected = this.whService.getWarehouseByName(event.warehouse);
      console.log('EVENT: ' + event.warehouse);
    }
    this.selectedWh = selected;
    this.results = [
      {
        'name': 'Free',
        'value': selected.getCapacity().free
      },
      {
        'name': 'Used',
        'value': selected.getCapacity().used
      },
    ];
    console.log('SELECTED: ' + whName.toString());
  }

  onResize() {
    const hostElem = this.detailContainer.nativeElement;

    if (hostElem.parentNode !== null) {
      // Get the container dimensions
      const dims = hostElem.getBoundingClientRect();
      this.whService.setAreaChartDim(dims.width, dims.height);
      console.log('DETAIL DIMENSIONS: ' + (dims.width));
    }
  }

  public transformInfo() {
    switch (this.infoState) {
      // case 'selected1': {
      //   this.infoState = 'selected2';
      //   break;
      // }
      // case 'selected2': {
      //   this.infoState = 'selected1';
      //   break;
      // }
      default: {
        this.infoState = 'selected1';
        break;
      }
    }
    console.log('Infostate: ' + this.infoState);
  }

  public refreshWarehouses() {
    if (this.isOld) {
      this.destroyMap();
    }
    this.config.dataProvider.images = [];
    const warehouses: Warehouse[] = this.whService.getWarehouses();
    for (const warehouse of warehouses) {
      const wh = {
        'latitude': warehouse.lat,
        'longitude': warehouse.lon,
        'imageURL': 'https://www.shareicon.net/data/128x128/2016/09/02/824673_storage_512x512.png',
        // 'svgPath': this.warehouseSVG,
        // 'scale': 1,
        'width': 40,
        'height': 40,
        'balloonText': warehouse.name,
        // 'zoomLevel': 1.2,
        'label': '',
        'selectable': true
      };
      this.config.dataProvider.images.push(wh);
    }

    // const truck = {
    //     'svgPath': this.truck3SVG,
    //     // 'color': '#7e90b1',
    //     'alpha': 1,
    //     'animateAlongLine': true,
    //     'positionOnLine': 1,
    //     'lineId': 'line1',
    //     'flipDirection': false,
    //     'loop': true,
    //     'scale': 0.05,
    //     'positionScale': 1.5,
    //     'selectable': true,
    //     'bringForwardOnHover': true,
    //   };
    // this.config.dataProvider.images.push(truck);

    this.buildMap();
    this.addListener();
    this.isOld = true;
    console.log('MAP: refreshWarehouses');
  }

  public destroyMap() {
    this.AmCharts.destroyChart(this.chart);
  }

  public buildMap() {
    this.chart = this.AmCharts.makeChart('chartdiv', this.config );
    console.log('MAP: buildMap');
  }

  /**
   * Creates a custom map marker - a div for container and a
   * pie chart in it
   */
  public createCustomMarker(image) {

    // Create chart container
    const holder = document.createElement('div');
    holder.id = image.id;
    holder.title = image.title;
    holder.style.position = 'absolute';
    holder.style.width = image.width + 'px';
    holder.style.height = image.height + 'px';

    // Append the chart container to the map container
    image.chart.chartDiv.appendChild(holder);

    // Create a pie chart
    const chart = this.AmCharts.makeChart(image.id, image.pie);

    return holder;
  }
}
