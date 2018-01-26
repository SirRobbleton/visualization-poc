import {Component, DoCheck, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {WarehouseComponent} from '../warehouse/warehouse.component';
import {WarehouseDataService} from '../services/warehouse-data.service';
import {Warehouse} from '../services/warehouse.model';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss'],
  // providers: [NgbProgressbarConfig]
})
export class TrucksComponent implements OnInit, DoCheck {
  @ViewChild('chartContainer') chartContainer: ElementRef;

  public counter = 0;
  public trucks = [
    {
      'name': 'Transport 1',
      'departure': 'Warehouse 2',
      'destination': 'Warehouse 1',
      'progress': 75
    }
  ];

  constructor(private config: NgbProgressbarConfig, private whService: WarehouseDataService) {
    // customize default values of progress bars used by this component tree
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
  }

  // constructor (private whService: WarehouseDataService) {}

  ngOnInit() {
  }

  ngDoCheck() {
    this.counter++;
    if (this.counter > 4 && this.counter < 6) {
      this.onResize();
      // console.log('TRUCKS DoCheck:' + this.counter);
    }
  }

  onResize() {
    const hostElem = this.chartContainer.nativeElement;

    if (hostElem.parentNode !== null) {
      // Get the container dimensions
      const dims = hostElem.getBoundingClientRect();
      this.whService.setChartColSize(dims.width - 18);
      // console.log('TRUCK PROGRESS: ' + (dims.width));
    }
  }
}
