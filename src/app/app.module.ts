import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {NgbModule, NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import {DataService} from './services/data.service';
import { VisualsComponent } from './visuals/visuals.component';
import { Vis3dGraphDirective } from './visuals/vis3dgraph.directive';
import {VisualDataService} from './services/visual-data.service';
import { DropdownComponent } from './dropdown/dropdown.component';
import * as routes from './services/routes';
import {HttpModule, JsonpModule} from '@angular/http';
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
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { StorageHistoryComponent } from './storage-history/storage-history.component';
import {DatabaseService} from './services/database.service';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthService} from './services/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth/auth.component';
import {AgmCoreModule} from '@agm/core';
import { WarehouseDetailsPieComponent } from './warehouse-details-pie/warehouse-details-pie.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

@NgModule({
  declarations: [
    AppComponent,
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
    StorageHistoryComponent,
    SignupComponent,
    LoginComponent,
    AuthComponent,
    WarehouseDetailsPieComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    Ng2PageScrollModule,
    JsonpModule,
    RouterModule.forRoot(routes.routes, {useHash: true}),
    // PerfectScrollbarModule,
    AmChartsModule,
    NgxChartsModule,
    AngularFontAwesomeModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCP6Yz9RVpxNpwqjtxVokMmHu5_gM2duTU',
      libraries: ['places']
    }),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ DataService, VisualDataService, AmChartsService, WarehouseDataService, NgbProgressbarConfig, AuthService, DatabaseService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
