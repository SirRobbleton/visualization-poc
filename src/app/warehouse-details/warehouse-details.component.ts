import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, HostListener, Input,
  OnInit,
  Output,
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

  public innerWidth = 0;

  constructor(private modalService: NgbModal, private el: ElementRef) {
    // console.log('WH DETAILS: Constructor');
  }

  ngOnInit() {
    console.log('WH DETAILS: OnInit');
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }

  ngAfterViewInit() {
    // console.log('WH DETAILS: AfterViewInit');
  }

  ngAfterViewChecked() {
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.whDetailsLoaded.emit(true);
    }, 500);
  }

  ngAfterContentChecked() {
    // console.log('WH DETAILS: AfterView Checked: ' + this.counter);
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
