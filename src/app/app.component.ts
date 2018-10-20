import { Component, OnInit, NgZone } from '@angular/core';

import {MessageService} from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'BETA J!NX Shop on Twitch!';

	constructor(
		private messageService: MessageService,
		public zone: NgZone
		)
	{
	}

	ngOnInit(): void {
	}
}
