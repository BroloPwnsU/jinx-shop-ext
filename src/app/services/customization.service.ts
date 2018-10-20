import { Injectable } from '@angular/core';

import {MessageService} from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class CustomizationService {

    getCheckoutWindowTitle(): string {
        return "BETA Checkout - J!NX x Shroud";
    }

	constructor(private messageService: MessageService) {
	}
}
