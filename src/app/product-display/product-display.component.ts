import { Component, OnInit, OnChanges, Input } from '@angular/core';

import {CartService} from '../services/cart.service';
import {MessageService} from '../services/message.service';
import {Product} from '../classes/product';
import {SizeItem} from '../classes/size-item';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit, OnChanges {

	@Input() product : Product;

	sizesMode: boolean;
	buttonMessage: string;
	activePhoto: number = 1;
	selectedSize: SizeItem = null;
	oneSize: boolean = false;
	presale: boolean = false;
	presaleDate: string = null;

	setupProduct(): void {
		if (this.product == null)
			return;

		this.activePhoto = 1;
		this.selectedSize = null;
		this.oneSize = (this.product.sizes.length == 1);

		if (this.product.presaleDate != null) {
			this.presale = true;
		}
		else {
			this.presale = false;
		}
	}

	selectSize(size: SizeItem): void {
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

		this.selectedSize = size;
	}

	cancelAdd(): void {
		this.selectedSize = null;
	}

	addToCart(): void {
		//Adds the previously selected size to the cart.

		this.cartService.addItem(this.product, this.selectedSize);
		this.selectedSize = null;
	}

	onNextPhoto(): void {
		if (this.activePhoto < 1 || this.activePhoto >= this.product.numberOfPhotos)
			this.activePhoto = 1;
		else
			this.activePhoto = this.activePhoto + 1;

		this.messageService.add("Ph " + this.activePhoto);
	}

	onPreviousPhoto(): void {
		if (this.activePhoto <= 1 || this.activePhoto > this.product.numberOfPhotos)
			this.activePhoto = this.product.numberOfPhotos;
		else
			this.activePhoto = this.activePhoto - 1;
			
		this.messageService.add("Ph " + this.activePhoto);
	}

	constructor(
		private messageService: MessageService,
		private cartService: CartService
		) {
	}

	ngOnInit() {
		this.setupProduct();
	}

	ngOnChanges() {
		this.setupProduct();
	}
}
