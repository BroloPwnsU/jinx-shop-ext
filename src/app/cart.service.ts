import { Injectable } from '@angular/core';

import {MessageService} from './message.service';

import {Order} from './order';
import {CartItem} from './cart-item';
import {Product} from './product';
import {SizeItem} from './size';

@Injectable({
  providedIn: 'root'
})
export class CartService {

	cart: Order;
	localStorageKey: string = 'app-cart';

	storeCart(): void {
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.cart));
	}

	loadCart(): void {
		var cartStr = localStorage.getItem(this.localStorageKey);

		this.cart = new Order();
		console.log(cartStr);
		this.messageService.add(cartStr);

		if (cartStr != null && cartStr != 'undefined')
			this.cart.populateFromJSON(cartStr);
	}

	addItem(product: Product, size: SizeItem): CartItem {
		if (!product || !size)
			return;

		this.messageService.add(`adding item id=${size.itemId}`);

		var item: CartItem = {
			productName: product.name,

			colorName: product.colorName,
			colorHex: product.colorHex,
			
			sizeName: size.name,
			sizeAbbreviation: size.abbreviation,

			productId: product.id,
			colorId: product.colorId,
			sizeId: size.id,
			itemId: size.itemId,

			price: product.price,
			count: 1
		};

		this.cart.items.push(item);

		this.cart.calculateSubtotal();
		this.storeCart();

		return item;
	}

	incrementItem(item: CartItem): void {		
		if (!item)
			return;

		item.count++;

		this.messageService.add(`Item ${item.itemId} incremented`);

		this.cart.calculateSubtotal();
		this.storeCart();
	}

	decrementItem(item: CartItem): void {		
		if (!item)
			return;

		item.count--;
		this.messageService.add(`Item ${item.itemId} decremented`);

		if (item.count <= 0)
		{
			this.removeItem(item);
		}

		this.cart.calculateSubtotal();
		this.storeCart();
	}

	removeItem(item: CartItem): void {
		if (!item)
			return;
			
		// Find and remove item from an array
		var i = this.cart.items.indexOf(item);
		if(i != -1)
			this.cart.items.splice(i, 1);

		this.cart.calculateSubtotal();
		this.storeCart();
	}

	getCart(): Order {
		return this.cart;
	}

	clear(): void {
		this.cart = new Order();
		this.storeCart();
	}

	constructor(private messageService: MessageService) {
		
		this.loadCart();
	}
}
