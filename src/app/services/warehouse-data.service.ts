import { Injectable } from '@angular/core';
import {Warehouse} from './warehouse.model';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class WarehouseDataService {
  public chartColumnSize = new BehaviorSubject<number>(10);
  private warehouses: Warehouse[] = [];

  constructor() {
    const wh1 = new Warehouse(1.32, 103.79, '', 'Warehouse 1', 30, 20);
    const wh2 = new Warehouse(1.32, 103.68, '', 'Warehouse 2', 40, 100);
    const wh3 = new Warehouse(1.41, 103.72, '', 'Warehouse 3', 60, 40);
    const wh4 = new Warehouse(1.34, 103.82, '', 'Warehouse 4', 100, 50);

    this.warehouses.push(wh1);
    this.warehouses.push(wh2);
    this.warehouses.push(wh3);
    this.warehouses.push(wh4);
  }

  public getWarehouses() {
    return this.warehouses;
  }

  public getWarehouseByName(whName: string) {
    for (const wh of this.warehouses) {
      if (wh.name === whName) {
        return wh;
      }
    }
  }
  public setChartColSize(width: number) {
    this.chartColumnSize.next(width);
  }

  public addWarehouse(wh: Warehouse) {
    this.warehouses.push(wh);
    console.log('List of Warehouses: ' + this.warehouses.length);
    // console.log(JSON.stringify(this.warehouses));
  }

  public getChartData(index: number) {
    const wh = this.warehouses[index];
    const whData = [
      {
        'name': wh.name,
        'series': [
          {
            'name': 'Free',
            'value': wh.getCapacity().free
          },
          {
            'name': 'Used',
            'value': wh.getCapacity().used
          }
        ]
      }
    ];
    return whData;
  }
}