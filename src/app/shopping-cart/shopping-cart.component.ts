import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {CartService} from '../cart.service';
import {MessageService} from '../message.service';

import {Order} from '../order';
import {CartItem} from '../cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

	@Output() onCheckoutStart = new EventEmitter<any>();

	cart: Order;

	hasItems(): boolean {
		if (this.cart && this.cart.items.length > 0)
			return true;

		return false;
	}

	isEmpty(): boolean {
		return !this.hasItems();
	}

	incrementItem(item: CartItem): void {
		this.cartService.incrementItem(item);
	}

	decrementItem(item: CartItem): void {
		this.cartService.decrementItem(item);
	}

	startCheckout(): void {
	    this.messageService.add("Trying to start checkout.");
	    this.onCheckoutStart.emit();
	}

	constructor(
		private cartService: CartService,
		private messageService: MessageService
		) { }

	ngOnInit() {
		this.cart = this.cartService.getCart();
	}

}
