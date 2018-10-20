import { Injectable } from '@angular/core';

import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

	constructor(private messageService: MessageService) {
		
	}

	ngOnInit(): void {
		this.accessToken = this.loadSomething(this.accessTokenStorageKey);
		this.opaqueId = this.loadSomething(this.opaqueIdStorageKey);
		this.channelId = this.loadSomething(this.channelIdStorageKey);
	}

	channelId: string = null;
	channelIdStorageKey: string = "app-channel-id";

	opaqueId: string = null;
	opaqueIdStorageKey: string = "app-opaque-id";

	accessToken: string;
	accessTokenStorageKey: string = 'app-access-token';

	loadSomething(theKey: string): string {
		return localStorage.getItem(theKey);
	}

	storeSomething(theKey: string, theString: string): void {
		localStorage.setItem(theKey, theString);
	}



	//Access Token
	setAccessToken(accessToken: string): void { 
		this.accessToken = accessToken;
		this.storeSomething(this.accessTokenStorageKey, this.accessToken);
	}

	getAccessToken(): string {
		if (this.accessToken == null)
			this.accessToken = this.loadSomething(this.accessTokenStorageKey);
		return this.accessToken;
	}

	//Opaque ID
	setOpaqueId(opaqueId: string): void { 
		this.opaqueId = opaqueId;
		this.storeSomething(this.opaqueIdStorageKey, this.opaqueId);
	}

	getOpaqueId(): string {
		if (this.opaqueId == null)
			this.opaqueId = this.loadSomething(this.opaqueIdStorageKey);
		return this.opaqueId;
	}

	//Channel ID
	setChannelId(channelId: string): void { 
		this.channelId = channelId;
		this.storeSomething(this.channelIdStorageKey, this.channelId);
	}

	getChannelId(): string {
		if (this.opaqueId == null)
			this.opaqueId = this.loadSomething(this.channelIdStorageKey);
		return this.opaqueId;
	}
}
