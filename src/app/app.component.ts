import { Component, OnInit, NgZone } from '@angular/core';

import {MessageService} from './message.service';
import {AmazonPayService} from './amazon-pay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'BETA - Little Baby J!NX Shop on Twitch!';

	enableAmazonPay(value) {
		// this.zone.run(() => {
		
		this.messageService.add("Amazon Pay Loaded: " + value);
		console.log('enableAmazonPay ' + value);
		
		this.amazonPayService.setIsLoaded(value);

		// });
	}


	constructor(
		private messageService: MessageService,
		public zone: NgZone,
		private amazonPayService: AmazonPayService
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
	}
}
