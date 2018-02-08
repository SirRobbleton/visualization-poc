import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  public serviceData = [];
  public deviceDims = new BehaviorSubject<number[]>([0, 0]);

  defineDeviceDims(width: number, height: number) {
    this.deviceDims.next([width, height]);
  }
}
