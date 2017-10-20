import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {AuthGuard} from '../services/auth-gaurd.service';
import {SearchPageComponent} from './main/search-page/search-page.component';
import {CartComponent} from './main/cart/cart.component';
import {SettingComponent} from './main/setting/setting.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, canActivate: [AuthGuard], children: [
    {
      path: '', component: SearchPageComponent, canActivateChild: [AuthGuard],
    },
    {
      path: 'settings', component: SettingComponent, canActivateChild: [AuthGuard],
    }
  ]},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
export const routedComponents: any[] = [
  MainComponent, LoginComponent, SearchPageComponent, CartComponent, SettingComponent
];
