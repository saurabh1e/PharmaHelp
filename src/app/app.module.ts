import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {environment} from '../environments/environment';
import {SharedModule} from './shared-module/shared.module';
import {AppRoutingModule, routedComponents} from './app.routes';
import {AuthGuard} from '../services/auth-gaurd.service';
import {UserService} from '../services/user.service';
import { SettingComponent } from './main/setting/setting.component';


@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    SettingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
