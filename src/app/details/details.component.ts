import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  displayDetails = false;
  buttonClicks = [];

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  toggleDetails() {
    const date = this.getFormattedDate();
    this.displayDetails = !this.displayDetails;
    this.buttonClicks.push(date);
    this.dataService.serviceData.push(date);
  }

  getFormattedDate() {
    const date = new Date();
    const str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' +  date.getHours()
      + ':' + date.getMinutes() + ':' + date.getSeconds();
    return str;
  }

  getColor(index: number) {
    return index > 4 ? 'blue' : 'red';
  }
}
