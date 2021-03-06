import { Component, OnInit, Input } from '@angular/core';

import {CartService} from '../services/cart.service';
import {CartItem} from '../classes/cart-item';
import {Order} from '../classes/order';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-shopping-cart-header',
  templateUrl: './shopping-cart-header.component.html',
  styleUrls: ['./shopping-cart-header.component.css']
})
export class ShoppingCartHeaderComponent implements OnInit {

	cart: Order;
	cartEnabled: boolean = environment.cartEnabled;

	@Input() onCartPage: boolean = false;

	loadCartItems(): void {
		this.cart = this.cartService.getCart();
	}

	constructor(private cartService: CartService) { }

	ngOnInit() {
		this.loadCartItems();
	}

}
