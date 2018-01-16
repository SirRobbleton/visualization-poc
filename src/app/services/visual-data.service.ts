import { Injectable } from '@angular/core';
import * as jp from 'jsonpath';
import * as jpaths from '../services/resource-constants';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'underscore';

declare var vis: any;

@Injectable()
export class VisualDataService {

  private data = new vis.DataSet();

  private items = [
    {x: 1, y: 30, group: 0},
    {x: 2, y: 10, group: 0},
    {x: 3, y: 15, group: 0},
    {x: 1, y: 30, group: 1},
    {x: 2, y: 65, group: 1},
    {x: 3, y: 30, group: 1}
  ];

  private all_weeks = [];
  private optimizerInputJSON;
  private optimizerInputXML;
  public selectedData = new BehaviorSubject<object>({});
  private isXmlLoaded: boolean;
  public currentView = new BehaviorSubject<string>('updatePlan');
  private saveState = {
    week: '',
    resource: ''
  };

  constructor() {
  }

  public getSaveState() {
    return this.saveState;
  }

  public isLoaded() {
    return this.isXmlLoaded;
  }

  public getItems() {
    return this.items;
  }

  public setCurrentView(view: string) {
    this.currentView.next(view);
    // console.log('Set Current View: ' + view);
  }

  public getCurrentView() {
    // console.log('Get Current View: ' + this.currentView);
    return this.currentView;
  }

  public setOptimizerInput(type: string, inputPlan: string) {
    switch (type) {
      case 'json': {
        this.optimizerInputJSON = inputPlan;
        break;
      }
      case 'xml': {
        this.optimizerInputXML = inputPlan;
        break;
      }
      default: {
        console.log('WARNING: Optimizer Input not set correctly');
        break;
      }
    }
    this.isXmlLoaded = true;
  }

  public getOptimizerInput(type: string) {
    switch (type) {
      case 'json': {
        return this.optimizerInputJSON;
      }
      case 'xml': {
        return this.optimizerInputXML;
      }
      default: {
        console.log('WARNING: Could not get Optimizer Input');
      }
    }
  }

  public updatePlan(day: any): void {
    this.all_weeks.push(day);
  }

  public setSelectedData(dataId: any) {
    const selected = this.data.get(dataId);
    if (!_.isEqual(this.selectedData.value, selected)) {
      this.selectedData.next(selected);
      console.log(JSON.stringify(selected, undefined, 2));
    }
  }

  public getSelectedData() {
    return this.selectedData;
  }

  public getPlan() {
    return this.all_weeks;
  }

  public getData(week: string, resource?: string) {
    const filteredData = this.data.get({
      filter: (item) => {
        if (resource && resource !== '') {
          this.saveState.week = week;
          this.saveState.resource = resource;
          return (item.resource === resource && item.week === week);
        } else {
          this.saveState.week = week;
          this.saveState.resource = '';
          return (item.week === week);
        }
      }
    });
    console.log(JSON.stringify(this.saveState));
    // console.log(JSON.stringify(filteredData, undefined, 2));
    console.log(filteredData);
    return filteredData;
  }

  public clearData() {
    this.data.clear();
  }

  public passJSON(plan: object) {
    // const smt_weekA = jp.query(plan, jpaths.smt_weekA_JSONPath);
    // const both_weekA = jp.query(plan, jpaths.all_weekA_JSONPath);
    const all_weeks = jp.query(plan, jpaths.all_weeks_JSONPath);

    let count = 1;

    for (let i = 0; i < all_weeks.length; i++) {
      let week = '';
      if (i === 0 || i === 2) {
        week = 'A';
      } else { week = 'B'; }

      if (i === 0 || i === 1) {
        // let week = [];

        all_weeks[i].subSegment.forEach(weekday => {
          const assignments: string[] = [];
          if (weekday.hasOwnProperty('assignmentIds')) {
            for (const assignment of weekday.assignmentIds[0].assignmentId) {
              // console.log('Assignments: ' + assignment);
              assignments.push(assignment);
            }
          }
          const pot_string = weekday.$.pot.replace(',', '').replace(' s', '');
          const pot_value = +pot_string;
          const day = {
            x: count,
            y: 1,
            z: pot_value,
            day: weekday.$.name,
            resource: 'SMT',
            week: week,
            assignments: assignments
          };
          count++;
          // this.updateSMT(day);
          // this.updateAll(day);
          // week.push(day);
          this.updatePlan(day);
        });
        count = 1;
      }
      if (i === 2 || i === 3) {
        // let week = [];
        all_weeks[i].subSegment.forEach(weekday => {
          const assignments: string[] = [];
          if (weekday.hasOwnProperty('assignmentIds')) {
            for (const assignment of weekday.assignmentIds[0].assignmentId) {
              // console.log('Assignments: ' + assignment);
              assignments.push(assignment);
            }
          }
          const pot_string = weekday.$.pot.replace(',', '').replace(' s', '');
          const pot_value = +pot_string;
          const day = {
            x: count,
            y: 3,
            z: pot_value,
            day: weekday.$.name,
            resource: 'TEST',
            week: week,
            assignments: assignments
          };
          count++;
          // this.updateAll(day);
          // week.push(day);
          this.updatePlan(day);
        });
        count = 1;
      }
    }

    this.data.add(this.all_weeks);
    console.log(this.data);
  }

}
