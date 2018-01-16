import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {NgbModule, NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {ServerComponent} from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import {WarningsComponent} from './warnings/warnings.component';
import {SuccessComponent} from './success/success.component';
import { DetailsComponent } from './details/details.component';
import {DataService} from './services/data.service';
import { VisualsComponent } from './visuals/visuals.component';
import { Vis3dGraphDirective } from './visuals/vis3dgraph.directive';
import {VisualDataService} from './services/visual-data.service';
import { DropdownComponent } from './dropdown/dropdown.component';
import * as routes from './services/routes';
import {JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';
import { NavComponent } from './nav/nav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PlaygroundComponent } from './playground/playground.component';
import { Vis2dGraphDirective } from './visuals/vis2dgraph.directive';
import { MapComponent } from './map/map.component';
import {AmChartsService} from '@amcharts/amcharts3-angular';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import {WarehouseDataService} from './services/warehouse-data.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { TrucksComponent } from './trucks/trucks.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningsComponent,
    SuccessComponent,
    DetailsComponent,
    VisualsComponent,
    Vis3dGraphDirective,
    DropdownComponent,
    UploaderComponent,
    NavComponent,
    PlaygroundComponent,
    Vis2dGraphDirective,
    MapComponent,
    WarehousesComponent,
    WarehouseComponent,
    TrucksComponent,
    WarehouseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    JsonpModule,
    RouterModule.forRoot(routes.routes, {useHash: true}),
    // PerfectScrollbarModule,
    AmChartsModule,
    NgxChartsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ DataService, VisualDataService, AmChartsService, WarehouseDataService, NgbProgressbarConfig],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
