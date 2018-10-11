import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	@Output() onCheckoutExit = new EventEmitter();
	@Input() amazonPayLoaded: boolean = false;

	exitCheckout(): void {
		this.onCheckoutExit.emit();
	}

	showAmazonPayButton(): void {
		if (!this.amazonPayLoaded) {
			this.messageService.add("Amazon Pay not loaded. Try again.");
			return;
		}

		//Amazon Pay library loaded. Let's create a button and get busy wid it.
		var authRequest; 
		(<any>OffAmazonPayments).Button("AmazonPayButton", "A3NUQDAIHK2DRR", { 
			type:  "PwA", 
			color: "DarkGray", 
			size:  "medium", 

			authorization: function() { 
				var loginOptions = {scope: "payments:widget", popup: "true"}; 
				authRequest = amazon.Login.authorize (loginOptions, "REDIRECT-URL");
			}
		});
	}
	
	constructor(
		private messageService: MessageService
		) { }

	ngOnInit() {
		this.showAmazonPayButton();
	}

}
