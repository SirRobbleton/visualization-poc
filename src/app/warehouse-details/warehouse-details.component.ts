import {
  AfterContentChecked,
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
export class WarehouseDetailsComponent implements OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked, AfterContentInit {

  @Input() warehouse: Warehouse;
  @Output('whDetailsLoaded') whDetailsLoaded: EventEmitter<boolean> = new EventEmitter();

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
    this.counter++;
  }

  ngAfterContentInit() {
    console.log('WH DETAILS: AfterContentInit');
  }

  ngAfterContentChecked() {
    if (this.counter > 3 && this.counter < 5) {
      this.whDetailsLoaded.emit(true);
      console.log('WH: AfterView Checked');
    }
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
