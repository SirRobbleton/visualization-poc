import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input()
  styles: string[];

  @Output()
  selectedStyle: EventEmitter<string>;

  constructor() {
    this.selectedStyle = new EventEmitter();
  }

  chooseStyle(value) {
    this.selectedStyle.emit(value);
  }

  ngOnInit() {
  }

}
