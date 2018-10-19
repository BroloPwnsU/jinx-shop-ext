import { Injectable } from '@angular/core';

import {MessageService} from './message.service';

import {Order} from './order';
import {CartItem} from './cart-item';
import {Product} from './product';
import {SizeItem} from './size'; 

@Injectable({
  providedIn: 'root'
})
export class UserService  {

	accessToken: string;
	accessTokenStorageKey: string = 'app-access-token';

	storeAccessToken(): void {
	
		localStorage.setItem(this.accessTokenStorageKey, this.accessToken);
	}

	loadAccessToken(): void {
		this.accessToken = localStorage.getItem(this.accessTokenStorageKey);
		this.messageService.add("Loaded accessToken: " + this.accessToken);
	}

	setAccessToken(accessToken: string): void { 
		this.accessToken = accessToken;
		this.storeAccessToken();
	}

	getAccessToken(): string {
		return this.accessToken;
	}

	constructor(private messageService: MessageService) {
		
	}

	ngOnInit(): void {
		this.loadAccessToken();
	}
}
