import { Component, OnInit, OnChanges, Input } from '@angular/core';

import {CartService} from '../services/cart.service';
import {MessageService} from '../services/message.service';
import {Product} from '../classes/product';
import {SizeItem} from '../classes/size';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit, OnChanges {

	@Input() product : Product;

	sizesMode: boolean;
	buttonMessage: string;

	setSizesMode(active: boolean): void {
		if (!active)
			active = false;

		this.sizesMode = active;
	}

	onSizes(): void {
		//Show the item/sizes component
		this.setSizesMode(true);
	}

	onBuy(size: SizeItem): void {
		//They want to purchase the selected size.

		// Make sure it has stock.
		if (!size)
		{
			this.messageService.add("Size is null.");
			return;
		}
		if (!size.available)
		{
			this.messageService.add("Size not available.");
			return;
		}

		this.cartService.addItem(this.product, size);
		this.setSizesMode(false);
	}

	constructor(
		private messageService: MessageService,
		private cartService: CartService
		) {
	}

	ngOnInit() {
	}

	ngOnChanges() {
		this.setSizesMode(false);
	}
}
