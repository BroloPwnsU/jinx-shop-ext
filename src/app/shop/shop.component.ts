import { Component, OnInit } from '@angular/core';

import {MessageService} from '../message.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

	checkingOut: boolean = false;

	startCheckout(): void {
		this.checkingOut = true;
	    this.messageService.add("Starting checkout.");
	}

	startShopping(): void {
		this.checkingOut = false;
	    this.messageService.add("Starting shop."); 
	}

	constructor(
		private messageService: MessageService
		)
	{
	}

	ngOnInit(): void {
		this.startShopping();
	}
}