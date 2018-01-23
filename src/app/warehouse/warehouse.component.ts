import {
  AfterContentChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnInit,
  ViewChild
} from '@angular/core';
import {Warehouse} from '../services/warehouse.model';
import {WarehouseDataService} from "../services/warehouse-data.service";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit, DoCheck {

  @Input('warehouse') public warehouse: Warehouse;
  @Input('chartSize') public chartSize: any[];

  whData: any[];
  //
  // options
  view: any[] = [];
  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private whService: WarehouseDataService) {
    console.log('Warehouse Constructor');
  }

  ngOnInit() {
    this.whData = this.createChartData();
    console.log('OnInit Warehouse');
    this.whService.chartColumnSize.subscribe((size: number) => {
      if (size !== this.view[0]) {
        this.view = [size, 50];
      }
    });
  }

  ngDoCheck() {
    // this.whService.chartColumnSize.subscribe((size: number) => {
    //   if (size !== this.view[0]) {
    //     this.view = [size, 50];
    //   }
    // });
  }

  public createChartData() {
    const whData = [
      {
        'name': this.warehouse.name,
        'series': [
          {
            'name': 'Free',
            'value': this.warehouse.getCapacity().free
          },
          {
            'name': 'Used',
            'value': this.warehouse.getCapacity().used
          }
        ]
      }
    ];
    return whData;
  }

  onSelect(event) {
    console.log(event);
  }
}
