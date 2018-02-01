import {AfterContentChecked, AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WarehouseDataService} from '../services/warehouse-data.service';

@Component({
  selector: 'app-warehouse-details-pie',
  templateUrl: './warehouse-details-pie.component.html',
  styleUrls: ['./warehouse-details-pie.component.scss']
})
export class WarehouseDetailsPieComponent implements OnInit, AfterViewChecked, AfterContentChecked {

  @Input('label') public label: string;
  @Input('gradient') public gradient: boolean;
  @Input('view') public view: any[];
  @Input('config') public config: object;
  @Input('scheme') public scheme: object;
  @Input('results') public results: object[];

  @Output('whDetailsLoaded') whDetailsLoaded: EventEmitter<boolean> = new EventEmitter();

  constructor(private whService: WarehouseDataService) {
  }

  ngOnInit() {
    console.log('WH DETAILS PIE: OnInit');
    this.whService.pieColumnSize.subscribe((dims: any) => {
      if (dims.width !== this.view[0]) {
        if (dims.width < 335) {
          this.view = [dims.width, dims.height];
        } else {
          this.view = [dims.width * 1.5, dims.height];
        }
      }
      console.log('WH DETAILS PIE dims: ' + dims.width + ', ' + dims.height);
    });
  }

  ngAfterViewChecked() {
  }

  ngAfterContentChecked() {
    //   console.log('WH DETAILS PIE: AfterView Checked');
  }
}
