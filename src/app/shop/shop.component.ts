import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

	checkingOut: boolean = false;
	shopMode: string = environment.shopMode;

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