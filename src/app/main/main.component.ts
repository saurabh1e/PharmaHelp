import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart/cart.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  viewProviders: [CartService]
})
export class MainComponent implements OnInit {
  routes: Object[] = [
    {
      title: 'Home',
      route: '/',
      icon: 'home',
    }, {
      title: 'Pennding Orders',
      route: '/',
      icon: 'schedule',
    },  {
      title: 'Order History',
      route: '/',
      icon: 'receipt',
    }, {
      title: 'Customers',
      route: '/',
      icon: 'people',
    }, {
      title: 'Settings',
      route: '/settings',
      icon: 'settings',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
