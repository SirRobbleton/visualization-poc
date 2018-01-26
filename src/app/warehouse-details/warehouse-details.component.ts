import {
  AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import {Warehouse} from '../services/warehouse.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #1A5276;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
  `]
})
export class WarehouseDetailsComponent implements OnInit, AfterViewChecked, AfterViewInit, AfterContentInit {

  @Input() warehouse: Warehouse;
  @Output() whDetailsLoaded = new EventEmitter();

  public counter = 0;

  constructor(private modalService: NgbModal) {
    console.log('WH DETAILS: Constructor');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('WH DETAILS: AfterViewInit');
  }

  ngAfterViewChecked() {
    // ++this.counter;
    // console.log('WH DETAILS: AfterViewChecked ' + this.counter);
    // if (this.counter > 30 && this.counter < 35) {
    //   this.whDetailsLoaded.emit('loaded');
    // }
  }

  ngAfterContentInit() {
    console.log('WH DETAILS: AfterContentInit');
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
