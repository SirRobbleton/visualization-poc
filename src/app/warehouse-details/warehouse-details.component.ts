import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
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
export class WarehouseDetailsComponent implements OnInit {

  @Input() warehouse: Warehouse;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
