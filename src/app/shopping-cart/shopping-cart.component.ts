import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {CartService} from '../cart.service';
import {MessageService} from '../message.service';
import {CustomizationService} from '../services/customization.service';

import {Order} from '../order';
import {CartItem} from '../cart-item';
import { UserService } from '../user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

	@Output() onCheckoutStart = new EventEmitter<any>();

	cart: Order;
	checkoutUrl: string = 'http://localhost:4200/start';

	checkoutWindow = {
		height: 500,
		width: 320,
		left: 200,
		top: 200
	};

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

	buildCartString(): string {
		let cartParams: string = "";

		//Cart is represented by itemid/count pairs.
		cartParams = this.cart.items.reduce( (tally, item) => {
			return `${item.itemId}:${item.count};` + tally;
		}, "");

		//Cut off the last semicolon.
		return cartParams.slice(0, cartParams.length - 1);
	}

	buildPageParams(): string {
		//Create the param string needed to power a checkout.
		// Items, Customer ID, Stream ID, etc.
		let cartParams = this.buildCartString();

		let opaqueId = this.userService.getOpaqueId();
		let channelId = this.userService.getChannelId();

		return `cart=${cartParams}&channel=${channelId}&user=${opaqueId}`;
	}



	openCheckout(): boolean {

		if (!this.hasItems()) {
			//Can't do that... that's not right.
			this.messageService.add("Empty cart. Can't checkout.");
			return;
		}

		let windowParams: string = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${this.checkoutWindow.width},height=${this.checkoutWindow.height},left=${this.checkoutWindow.left},top=${this.checkoutWindow.top}`;
		open(
			this.checkoutUrl + '?' + this.buildPageParams()
			, this.customService.getCheckoutWindowTitle()
			, windowParams
			);
		return false;
	}

	constructor(
		private cartService: CartService,
		private customService: CustomizationService,
		private userService: UserService,
		private messageService: MessageService
		) { }

	ngOnInit() {
		this.cart = this.cartService.getCart();
	}

}
