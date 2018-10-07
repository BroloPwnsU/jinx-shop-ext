import { Injectable } from '@angular/core';

import {MessageService} from './message.service';

import {ShoppingCart} from './shopping-cart';
import {CartItem} from './cart-item';
import {Product} from './product';
import {SizeItem} from './size';

@Injectable({
  providedIn: 'root'
})
export class CartService {

	cart: ShoppingCart;

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

		return item;
	}

	incrementItem(item: CartItem): void {		
		if (!item)
			return;

		item.count++;

		this.messageService.add(`Item ${item.itemId} incremented`);
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
	}

	removeItem(item: CartItem): void {
		if (!item)
			return;
			
		// Find and remove item from an array
		var i = this.cart.items.indexOf(item);
		if(i != -1)
			this.cart.items.splice(i, 1);
	}

	getCart(): ShoppingCart {
		return this.cart;
	}

	constructor(private messageService: MessageService) {
		 this.cart = new ShoppingCart();
		 //this.cart.items = [];
	}
}
