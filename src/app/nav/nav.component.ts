import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {VisualDataService} from '../services/visual-data.service';
import * as colors from '../services/colors';
import * as firebase from 'firebase';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef, private vdService: VisualDataService) {
    this.vdService.currentView.subscribe((value: string) => console.log('Current View: ' + value));
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAO7pxnm0So3C6X-YCp-E-VaZx0xJFK7aw',
      authDomain: 'visualization-poc.firebaseapp.com'
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.backgroundColor = colors.dark_blue1;
  }

  public setCurrentView(view: string) {
    this.vdService.setCurrentView(view);
  }
}
