import { Component, OnInit } from '@angular/core';

import {Product} from '../classes/product';
import {ProductService} from '../services/product.service';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
	
	activeProduct: Product;
	products: Product[];

	getProducts(): void {
		this.productService.getProducts()
			.subscribe(products => this.loadProducts(products));
	}

	loadProducts(products: Product[]): void {
		this.products = products;
	}

	activateProduct(product: Product): void {
		if (product == null) {
			this.activeProduct = null;
			return;
		}

		this.activeProduct = product;
	}

	closeProduct(): void {
		this.activeProduct = null;
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
