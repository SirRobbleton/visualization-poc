import {Routes} from '@angular/router';
import {VisualsComponent} from '../visuals/visuals.component';
import {UploaderComponent} from '../uploader/uploader.component';
import {PlaygroundComponent} from '../playground/playground.component';
import {MapComponent} from '../map/map.component';

export const routes: Routes = [
  {path: '', redirectTo: 'uploadPlan', pathMatch: 'full'},
  {path: 'uploadPlan', component: UploaderComponent},
  {path: 'displayPlan', component: VisualsComponent},
  {path: 'playground', component: PlaygroundComponent},
  {path: 'displayMap', component: MapComponent},
  {path: '**', component: VisualsComponent}
];
