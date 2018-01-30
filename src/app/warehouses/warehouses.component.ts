import {Component, DoCheck, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Warehouse} from '../services/warehouse.model';
import {WarehouseDataService} from '../services/warehouse-data.service';
import {MapsAPILoader} from '@agm/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Address} from '../services/address.model';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit, DoCheck {
  @Output() newWarehouse: EventEmitter<string> = new EventEmitter();
  @Output() selectedWarehouse = new EventEmitter();
  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('capacityCol') public capacityElementRef: ElementRef;

  public radioGroupForm: FormGroup;
  public selectedView = 'registerWarehouse';

  public address: Address;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;

  public warehouses: Warehouse[];

  constructor(private whService: WarehouseDataService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private formBuilder: FormBuilder) {
    this.warehouses = this.whService.getWarehouses();
    // console.log('WAREHOUSES: Constructor');
  }

  ngOnInit() {
    // console.log('WAREHOUSES: OnInit');

    this.radioGroupForm = this.formBuilder.group({
      'model': 'registerWarehouse'
    });

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          let country: string;
          let route: string;
          let city: string;
          let postalCode: string;
          let streetNumber: string;

          for (const component of place.address_components) {
            if (component.types[0] === 'route') {
              route = component.short_name;
            }
            if (component.types[0] === 'street_number') {
              streetNumber = component.short_name;
            }
            if (component.types[0] === 'locality') {
              city = component.short_name;
            }
            if (component.types[0] === 'country') {
              country = component.short_name;
            }
            if (component.types[0] === 'postal_code') {
              postalCode = component.short_name;
            }
          }

          console.log(this.address + '(' + this.latitude + ', ' + this.longitude);
          console.log(
            'Street ' + route +
            ' Number ' + streetNumber +
            ' City ' + city +
            ' Postal ' + postalCode +
            ' Country ' + country);
          this.address = new Address(city, streetNumber, route, country, postalCode);
        });
      });
    });
  }

  ngDoCheck() {
  }

  addNewWarehouse(wh: string, lat: number, lon: number, free: number, used: number) {
    const newWh: Warehouse = new Warehouse(lat, lon, '', wh, free, used, this.address);
    this.whService.addWarehouse(newWh);
    this.newWarehouse.emit('newWh');
  }

  rowSelected(warehouse: Warehouse) {
    this.selectedWarehouse.emit({
        warehouse: warehouse.name
      });
  }

  toggleView(view: string) {
    switch (view) {
      case 'register': {
        this.selectedView = 'registerWarehouse';
        break;
      }
      case 'warehouses': {
        this.selectedView = 'warehouseList';
        break;
      }
      case 'trucks': {
        this.selectedView = 'truckList';
        break;
      }
      default: {
          this.selectedView = 'registerWarehouse';
          break;
        }
      }
    }

  onResize(event) {
      const hostElem = this.capacityElementRef.nativeElement;
      if (hostElem.parentNode !== null) {
        // Get the container dimensions
        const dims = hostElem.getBoundingClientRect();
        this.whService.setChartColSize(2 * dims.width - 18);
        console.log('WAREHOUSES onResize: ' + (2 * dims.width - 18));
      }
  }
}
