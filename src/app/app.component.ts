import { Component, OnInit, NgZone } from '@angular/core';

import {MessageService} from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'BETA - Little Baby J!NX Shop on Twitch!';

	checkingOut: boolean = false;
	amazonPayLoaded: boolean = false;

	startCheckout(): void {
		this.checkingOut = true;
	    this.messageService.add("Starting checkout.");
	}

	startShopping(): void {
		this.checkingOut = false;
	    this.messageService.add("Starting shop experience.");
	}


	enableAmazonPay(value) {
		// this.zone.run(() => {
		
		this.messageService.add("Amazon Pay Loaded: " + value);
		console.log('enableAmazonPay ' + value);
		this.amazonPayLoaded = value;

		// });
	}


	constructor(
		private messageService: MessageService,
		public zone: NgZone
		)
	{		
	    (<any>window).angularComponentRef = {
	      zone: this.zone, 
	      enableAmazonPay: (value) => this.enableAmazonPay(value), 
	      component: this
	    };
	    console.log('reference added');
	}

	ngOnInit(): void {
		this.startShopping();
	}
}
