import { Component, OnInit } from '@angular/core';

import {CartService} from '../cart.service';
import {CartItem} from '../cart-item';
import {ShoppingCart} from '../shopping-cart';

@Component({
  selector: 'app-shopping-cart-header',
  templateUrl: './shopping-cart-header.component.html',
  styleUrls: ['./shopping-cart-header.component.css']
})
export class ShoppingCartHeaderComponent implements OnInit {

	cart: ShoppingCart;

	loadCartItems(): void {
		this.cart = this.cartService.getCart();
	}

	getTotal(): number {
		return this.cart.getTotal();
	}

	constructor(private cartService: CartService) { }

	ngOnInit() {
		this.loadCartItems();
	}

}
