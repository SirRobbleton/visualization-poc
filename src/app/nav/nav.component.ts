import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {VisualDataService} from '../services/visual-data.service';
import * as colors from '../services/colors';

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
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.backgroundColor = colors.dark_blue1;
  }

  public setCurrentView(view: string) {
    this.vdService.setCurrentView(view);
  }
}
