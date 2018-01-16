import {Component, Input, OnInit} from '@angular/core';
import {Warehouse} from '../services/warehouse.model';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.scss']
})
export class WarehouseDetailsComponent implements OnInit {

  @Input() warehouse: Warehouse;

  constructor() { }

  ngOnInit() {
  }

}
