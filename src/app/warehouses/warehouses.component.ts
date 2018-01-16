import {Component, DoCheck, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Warehouse} from '../services/warehouse.model';
import {WarehouseDataService} from '../services/warehouse-data.service';
import {WarehouseComponent} from '../warehouse/warehouse.component';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit, DoCheck {

  @Output() newWarehouse: EventEmitter<string> = new EventEmitter();
  @Output() selectedWarehouse = new EventEmitter();

  public warehouses: Warehouse[];
  public chartSize: any[] = [];

  constructor(private whService: WarehouseDataService) {
    this.warehouses = this.whService.getWarehouses();
  }

  ngOnInit() {
  }

  ngDoCheck() {}

  addNewWarehouse(wh: string, lat: number, lon: number, free: number, used: number) {
    const newWh: Warehouse = new Warehouse(lat, lon, '', wh, free, used);
    this.whService.addWarehouse(newWh);
    this.newWarehouse.emit('newWh');
  }

  rowSelected(warehouse: Warehouse) {
    this.selectedWarehouse.emit({
        warehouse: warehouse.name
      });
  }
}
