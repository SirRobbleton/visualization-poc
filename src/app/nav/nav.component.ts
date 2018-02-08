import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {VisualDataService} from '../services/visual-data.service';
import * as colors from '../services/colors';
import * as firebase from 'firebase';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {

  public isLoggedIn: boolean;
  public planUploaded: boolean;

  constructor(private elementRef: ElementRef, private vdService: VisualDataService, private authService: AuthService) {
    this.vdService.currentView.subscribe((value: string) => console.log('Current View: ' + value));
    this.authService.loginSuccessful.subscribe((logged: string) => {
      if (logged === 'success') {
        this.isLoggedIn = true;
      }
      console.log('IS LOGGED: ' + this.isLoggedIn);
    });
    this.vdService.dataUploaded.subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        this.planUploaded = true;
      }
    });
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
