import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {TdMediaService} from '@covalent/core';

import {SearchService} from './search.service';
import * as firebase from 'firebase';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {CartService, Product} from '../cart/cart.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  viewProviders: [SearchService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit, AfterViewInit {

  stateCtrl: FormControl;
  filteredProduct: Observable<Product[]>;

  constructor(private _searchService: SearchService,
              private  _db: AngularFirestore,
              private _cartService: CartService,
              private _changeDetectorRef: ChangeDetectorRef,
              public _media: TdMediaService) {
    this.filteredProduct = this.filterStates('a');
    this.stateCtrl = new FormControl();
    this.stateCtrl.valueChanges.debounceTime(500)
      .subscribe(name => {
        if (typeof name === 'string') {
          this.filteredProduct = this.filterStates(name);
        }
      });
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => { // workaround since MatSidenav has issues redrawing at the beggining
      this._media.broadcast();
      this._changeDetectorRef.detectChanges();
    });
  }

  filterStates(name: string) {
    name = name ? name.toUpperCase() : name;
    return this._db.collection('products', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('name', '>=', name).orderBy('name').limit(10);
      return query;
    }).valueChanges();
  }

  showProduct(event: MatAutocompleteSelectedEvent): void {
    this.filteredProduct = this._db.collection('products', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('id', '==', event.option.value.id).limit(1);
      return query;
    }).valueChanges();
  }

  displayFn(value: Product): string {
    return value ? value.name : '';
  }

  addToCart(product: Product): void {
    this._cartService
      .addOrUpdateItem(product, 1);
  }


}
