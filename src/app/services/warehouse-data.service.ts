import {Injectable} from '@angular/core';
import {Warehouse} from './warehouse.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DatabaseService} from './database.service';
import {Address} from './address.model';

@Injectable()
export class WarehouseDataService {
  public chartColumnSize = new BehaviorSubject<number>(100);
  public pieColumnSize = new BehaviorSubject<any>({});
  public warehouses: Warehouse[] = [];
  public finishedLoading = new BehaviorSubject<boolean>(false);

  constructor(private dbService: DatabaseService) {
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

  public setPieChartColSize(width: number, height: number) {
    const dims = {
      'width': width,
      'height': height
    };
    this.pieColumnSize.next(dims);
  }

  public addWarehouse(wh: Warehouse) {
    this.warehouses.push(wh);
    console.log('WH SERVICE - List of Warehouses: ' + this.warehouses.length);
    this.saveToDatabase(this.warehouses);
  }

  public saveToDatabase(warehouses: Warehouse[]) {
    this.dbService.storeWarehouses(warehouses)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  public getFromDatabase(token: string) {
    console.log('WH SERVICE: getFromDatabase');
    this.dbService.getWarehouses(token)
      .subscribe(
        (warehouses: any[]) => {
          console.log(warehouses);
          if (warehouses.length !== 0) {
            this.warehouses = [];
            for (const warehouse of warehouses) {
              const adr = warehouse.address;
              const address = new Address(adr._city, adr._streetNumber, adr._route, adr._country, adr._postalCode);
              const formattedLon = this.precisionRound(warehouse.lon, 4);
              const formattedLat = this.precisionRound(warehouse.lat, 4);
              const wh = new Warehouse(formattedLat, formattedLon, '',
                warehouse.name, warehouse.freeAbsolute,
                warehouse.usedAbsolute, address);
              this.warehouses.push(wh);
            }
            console.log(this.warehouses);
            this.finishedLoading.next(true);
          }
          this.finishedLoading.next(true);
        },
        (error) => console.log(error)
      );
  }

  public precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
}
