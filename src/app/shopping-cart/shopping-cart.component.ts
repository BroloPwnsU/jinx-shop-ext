import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {CartService} from '../services/cart.service';
import {MessageService} from '../services/message.service';
import {CustomizationService} from '../services/customization.service';

import {Order} from '../classes/order';
import {CartItem} from '../classes/cart-item';
import { UserService } from '../services/user.service';
import { StoreCustomization } from '../classes/store-customization';

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

		let userAuth = this.userService.getUserAuth();
		//let channelId = this.userService.getChannelId();

		return `cart=${cartParams}&token=${userAuth.token}&userid=${userAuth.userId}&channelid=${userAuth.channelId}`;
	}



	openCheckout(): boolean {

		if (!this.hasItems()) {
			//Can't do that... that's not right.
			this.messageService.add("Empty cart. Can't checkout.");
			return;
		}

		let customization: StoreCustomization = null;
		this.customService.getCustomization().subscribe(
			(cust) => { customization = cust; } 
		);

		let windowParams: string = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${this.checkoutWindow.width},height=${this.checkoutWindow.height},left=${this.checkoutWindow.left},top=${this.checkoutWindow.top}`;
		open(
			this.checkoutUrl + '?' + this.buildPageParams()
			, customization.title
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
