import { Injectable } from '@angular/core';

import {MessageService} from './message.service';
import {TwitchAuth} from '../classes/twitch-auth';
import { load } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

	constructor(private messageService: MessageService) {
		
	}

	ngOnInit(): void {
		this.accessToken = this.loadSomething(this.accessTokenStorageKey);
		this.userAuth = this.loadTwitchAuth(this.userAuthStorageKey);
	}

	userAuth: TwitchAuth = null;
	userAuthStorageKey: string = "app-user-auth";

	accessToken: string;
	accessTokenStorageKey: string = 'app-access-token';

    isUserAuthenticated(): boolean {
        if (this.userAuth != null
            && this.userAuth.token != null)
        {
            return true;
        }
        return false;
    }
	
	loadTwitchAuth(theKey: string): TwitchAuth {
		let obj = JSON.parse(this.loadSomething(theKey));
		
		if (obj != null) {
			let auth = new TwitchAuth();
			auth.token = obj.token;
			auth.userId = obj.userId;
			auth.channelId = obj.channelId;
			return auth;
		}

		return null;
	}

	storeTwitchAuth(theKey: string, auth: TwitchAuth): void {
		let theString = JSON.stringify(auth);
		this.storeSomething(theKey, theString);
	}

	loadSomething(theKey: string): string {
		return localStorage.getItem(theKey);
	}

	storeSomething(theKey: string, theString: string): void {
		localStorage.setItem(theKey, theString);
	}


	setAccessToken(accessToken: string): void { 
		this.accessToken = accessToken;
		this.storeSomething(this.accessTokenStorageKey, this.accessToken);
	}

	getAccessToken(): string {
		if (this.accessToken == null)
			this.accessToken = this.loadSomething(this.accessTokenStorageKey);
		return this.accessToken;
	}
	
    setUserAuth(userAuth: TwitchAuth) {
        this.userAuth = userAuth;
		this.storeTwitchAuth(this.userAuthStorageKey, this.userAuth);

        this.messageService.add(`Set Twitch user userId(${userAuth.userId})`);
        this.messageService.add(`Set Twitch user token(${userAuth.token})`);
        this.messageService.add(`Set Twitch user channelId(${userAuth.channelId})`);
    }

    getUserAuth(): TwitchAuth {
		if (this.userAuth == null)
			this.userAuth = this.loadTwitchAuth(this.userAuthStorageKey);
		return this.userAuth;
    }
}
