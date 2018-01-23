import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Warehouse} from "./warehouse.model";
import 'rxjs/Rx';

@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  public storeWarehouses(warehouses: Warehouse[]) {
    return this.http.put('https://visualization-poc.firebaseio.com/data.json', warehouses);
  }

  public getWarehouses() {
    return this.http.get('https://visualization-poc.firebaseio.com/data.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }
}
