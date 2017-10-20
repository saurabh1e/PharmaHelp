import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CartService, Order} from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cart$: Observable<Order>;
  constructor(public _cartService: CartService) { }

  ngOnInit() {
    this.cart$ = this._cartService.cart$;
  }
}
