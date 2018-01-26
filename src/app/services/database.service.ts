import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Warehouse} from "./warehouse.model";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";

@Injectable()
export class DatabaseService {
  public token: string;

  constructor(private http: Http, private authService: AuthService) { }


  public storeWarehouses(warehouses: Warehouse[]) {
    return this.http.put('https://visualization-poc.firebaseio.com/data.json?auth=' + this.token, warehouses);
  }

  public getWarehouses(token: string) {
    console.log('DB SERVICE: getWarehouses');
    this.token = token;
    // const token = this.authService.getToken();
      return this.http.get('https://visualization-poc.firebaseio.com/data.json?auth=' + token)
        .map(
          (response: Response) => {
            const data = response.json();
            console.log(data);
            if (data === null) {
              return [];
            }
            return data;
          }
        );
  }
}
