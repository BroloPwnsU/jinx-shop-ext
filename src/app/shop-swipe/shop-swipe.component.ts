import { Component, OnInit } from '@angular/core';

import {Product} from '../classes/product';
import {SizeItem} from '../classes/size-item';
import {ProductService} from '../services/product.service';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-shop-swipe',
  templateUrl: './shop-swipe.component.html',
  styleUrls: ['./shop-swipe.component.css']
})
export class ShopSwipeComponent implements OnInit {

	
	activeProduct: Product;
	products: Product[];
	activeIndex: number = 0;


	getProducts(): void {
		this.productService.getProducts()
			.subscribe(products => this.loadProducts(products));
	}

	loadProducts(products: Product[]): void {
		this.products = products;
		if (this.products && this.products.length > 0)
			this.activateProduct(0);
	}

	activateProduct(newIndex: number): void {
		this.log(`Switch from Index ${this.activeIndex} to ${newIndex}`);

		this.activeIndex = newIndex;
		//this.log(`Active Product: Index ${this.activeIndex}`);
		this.activeProduct = this.products[this.activeIndex];
	}


	onNext(): void {
		this.log("Next " + this.activeIndex);
		if (this.activeIndex < 0 || this.activeIndex >= this.products.length - 1)
			this.activateProduct(0);
		else
			this.activateProduct(this.activeIndex + 1);
	}

	onPrevious(): void {
		this.log("Next " + this.activeIndex);
		if (this.activeIndex <= 0 || this.activeIndex >= this.products.length)
			this.activateProduct(this.products.length - 1);
		else
			this.activateProduct(this.activeIndex - 1);
	}

	log(message: string): void {
		this.messageService.add(message);
	}

	constructor(
		private productService : ProductService,
		private messageService : MessageService
		)
	{
	}

	ngOnInit() {
		//Load up the products from the service
		this.getProducts();
	}

}
