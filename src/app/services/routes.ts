import {Routes} from '@angular/router';
import {VisualsComponent} from '../visuals/visuals.component';
import {UploaderComponent} from '../uploader/uploader.component';
import {PlaygroundComponent} from '../playground/playground.component';
import {MapComponent} from '../map/map.component';
import {SignupComponent} from '../auth/signup/signup.component';
import {LoginComponent} from '../auth/login/login.component';
import {AuthComponent} from '../auth/auth/auth.component';

export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'uploadPlan', component: UploaderComponent},
  {path: 'displayPlan', component: VisualsComponent},
  {path: 'playground', component: PlaygroundComponent},
  {path: 'displayMap', component: MapComponent},
  // {path: 'signUp', component: SignupComponent},
  // {path: 'login', component: LoginComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', component: VisualsComponent}
];
