import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export interface Order {
  id: string;
  items: Item[];
  total: number;
  sub_total: number;
  discount: number;
  delivery_charge: number;
}

export interface Item {
  name: string;
  price: number;
  batch?: string;
  quantity: number;
  product_id: string;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  brand: {name: string};
  mrp: number;
  description: any[];
  prescription_required: boolean;
}

@Injectable()
export class CartService {
  _cart: Order = <Order>{items: [], discount: 0};
  _cart$: Subject<Order> = <Subject<Order>>  new Subject();
  constructor() {
  }

  set cart(data: Order) {
    this._cart = data;
    this._cart$.next(data);
  }
  get cart$(): Observable<Order> {
    return this._cart$.asObservable();
  }
  get cart(): Order {
    return this._cart;
  }
  addOrUpdateItem(product: Product, quantity: number): void {
    const cartItem = this.cart.items.find(item => item.product_id === product.id);
    if (cartItem) {
      cartItem.quantity = cartItem.quantity + quantity;
      if (cartItem.quantity < 1) {
        this.removeItem(cartItem);
        return;
      }
    } else {
      this.cart.items.push(<Item>{product_id: product.id, product: product, name: product.name, price: product.mrp, quantity: quantity});
    }
    this.calcTotal();
  }
  updateItem(item: Item, quantity: number): void {
    item.quantity = quantity;
      if (item.quantity < 1) {
        this.removeItem(item);
        return;
      }
    this.calcTotal();
  }
  updatePrice(item: Item, price): void {
    console.log(item, price);
    item.price = price;
    console.log(item, price);
    this.calcTotal();
  }
  removeItem(cartItem: Item): void {
    const cartItemIndex = this.cart.items.findIndex(item => item === cartItem);
    if (cartItemIndex > -1) {
      this.cart.items.splice(cartItemIndex, 1);
    }
    this.calcTotal();
  }
  calcTotal(): void {
    const cart = this.cart;
    cart.sub_total = this.cart.items.reduce((pVal, nVal) => {
      return pVal + (nVal.price * nVal.quantity);
    }, 0);
    cart.total = cart.sub_total - cart.discount;
    this.cart = cart;
  }
  updateDiscount(discount: number) {
    this.cart.discount = discount;
    this.calcTotal();
  }
}
