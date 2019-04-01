import { Component, OnInit, NgZone } from '@angular/core';

import {MessageService} from './services/message.service';
import {UserService} from './services/user.service';
import { CustomizationService } from './services/customization.service';
import { TwitchAuth } from './classes/twitch-auth';
import { StoreCustomization } from './classes/store-customization';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'Shop';
	customizationLoaded: boolean = false;
	loadingConfig: boolean = true;
	shopLoadError: boolean = false;
	messagesEnabled: boolean = environment.messagesEnabled;

	//Dev function
	fabricateAuth(): void {

		//First we get a fake auth, then we use that fake auth to authenticate ourselves.
		//It's like the door gives us the key. Which seems a bit foolish.

		this.customizationService.getFakeAuth().subscribe(
			(token) => {
				this.messageService.debug("Fake Auth: " + token);

				let twitchAuth: TwitchAuth = new TwitchAuth();
				twitchAuth.token = token;
				twitchAuth.channelId = "265737932";
				twitchAuth.userId = "9999999999";
				this.setUserAuth(twitchAuth);
			},
			(error) => {
				this.messageService.debug("Token failed.");
			}
		);


	}

	setShopLoadError(error): void {
		this.zone.run(() => {
			this.messageService.add("Store Config has an error: " + error, true);
			this.customizationLoaded = false;
			this.shopLoadError = true;
			this.loadingConfig = false;
		})
	}

	setCustomizationLoaded(customization: StoreCustomization) {
		this.zone.run(() => {
			this.title = customization.title;
			this.customizationLoaded = true;
			this.shopLoadError = false;
			this.loadingConfig = false;
		});
	}

	setUserAuth(twitchAuth): void {
		this.userService.setUserAuth(twitchAuth);

		this.messageService.debug("Set user auth: " + twitchAuth.token);

		//Now try to load the customization.
		this.customizationService.getCustomization().subscribe(
			(customization) => {
				if (customization != null) {
					this.setCustomizationLoaded(customization);
				}
				else {
					this.setShopLoadError("Config does not exist.");
				}
			},
			(error) => {
				this.setShopLoadError(error);
			}
		);
	}

	constructor(
		private userService: UserService,
		private customizationService: CustomizationService,
		private messageService: MessageService,
		public zone: NgZone
		)
	{
		if ((<any>window).twitchTunnel != null 
			&& (<any>window).twitchTunnel.authObject != null)
		{
			console.log("Existing auth");
			this.setUserAuth((<any>window).twitchTunnel.authObject);
		}

	    (<any>window).twitchTunnel = {
	      zone: this.zone, 
	      setTwitchAuth: (value) => this.setUserAuth(value), 
	      component: this
	    };
	    this.messageService.add('Twtich tunnel drilled.');
	}

	ngOnInit(): void {
	}
}
