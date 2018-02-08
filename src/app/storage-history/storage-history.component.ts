import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-storage-history',
  templateUrl: './storage-history.component.html',
  styleUrls: ['./storage-history.component.scss']
})
export class StorageHistoryComponent implements OnInit {

  public multi = [
    {
      'name': 'Total Space',
      'series': [
        {
          'name': 'Dec',
          'value': 210
        },
        {
          'name': 'Jan',
          'value': 210
        },
        {
          'name': 'Feb',
          'value': 210
        },
        {
          'name': 'Mar',
          'value': 220
        }
      ]
    },
    {
      'name': 'Used Space',
      'series': [
        {
          'name': 'Dec',
          'value': 30
        },
        {
          'name': 'Jan',
          'value': 160
        },
        {
          'name': 'Feb',
          'value': 190
        },
        {
          'name': 'Mar',
          'value': 180
        }
      ]
    }
  ];

  view: any[] = [430, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Space';
  yScaleMin = 0;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  legend = false;
  autoScale = false;
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.deviceDims.subscribe((dims: number[]) => {
      if (dims[0] < 370) {
        this.view = [310, 300];
        console.log(this.view);
      }
    });
  }

  onSelect(event) {
    console.log(event);
  }
}
