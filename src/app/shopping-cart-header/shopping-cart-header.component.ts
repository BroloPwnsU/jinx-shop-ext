import { Component, OnInit } from '@angular/core';

import {CartService} from '../cart.service';
import {CartItem} from '../cart-item';
import {Order} from '../order';

@Component({
  selector: 'app-shopping-cart-header',
  templateUrl: './shopping-cart-header.component.html',
  styleUrls: ['./shopping-cart-header.component.css']
})
export class ShoppingCartHeaderComponent implements OnInit {

	cart: Order;

	loadCartItems(): void {
		this.cart = this.cartService.getCart();
	}

	constructor(private cartService: CartService) { }

	ngOnInit() {
		this.loadCartItems();
	}

}
