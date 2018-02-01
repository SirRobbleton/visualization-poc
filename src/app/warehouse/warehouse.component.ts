import {
  AfterContentChecked, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnInit,
  Output, ViewChild
} from '@angular/core';
import {Warehouse} from '../services/warehouse.model';
import {WarehouseDataService} from '../services/warehouse-data.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit, DoCheck, AfterViewInit, AfterContentChecked, AfterViewChecked {

  @Input('warehouse') public warehouse: Warehouse;
  @Output() barIsLoaded: EventEmitter<boolean> = new EventEmitter();

  whData: any[];
  //
  // options
  view: any[] = [400, 100];
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

  public counter = 0;

  constructor(private whService: WarehouseDataService) {
    console.log('WH: Constructor');
  }

  ngOnInit() {
    this.whData = this.createChartData();
    console.log('WH: OnInit');
    this.whService.chartColumnSize.subscribe((size: number) => {
      if (size !== this.view[0]) {
        this.view = [size, 50];
        console.log('WH size: ' + size);
      }
    });
  }

  ngAfterViewInit() {
    console.log('WH: AfterViewInit');
  }

  ngAfterViewChecked() {
    this.counter++;
  }

  ngAfterContentChecked() {
    if (this.counter > 20 && this.counter < 22) {
      this.barIsLoaded.emit(true);
      console.log('WH: AfterView Checked');
    }
  }

  ngDoCheck() {
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
