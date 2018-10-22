import { Injectable, OnInit } from '@angular/core';

import {MessageService} from './message.service';

import {StoreCustomization} from '../classes/store-customization';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomizationService implements OnInit {
    //CustomizationService provides data for the channel

    defaultTitle = "Shroud Merch Booth - powered by J!NX";
    defaultMetaKeywords = ["1"];

    customization: StoreCustomization;

    getCustomization(): Observable<StoreCustomization> {
        if (this.customization != null) {
            //TODO: Use the channelId to load the customization, and set the defaults
            return new Observable<StoreCustomization>((observer) => {
                observer.next(this.customization);
            });
        }
        else {
            /*
            //TODO: Use the channelId to load the customization.
            //Set defaults.
            if (this.customization.title == null || this.customization.title == "")
                this.customization.title = this.defaultTitle;
                
            if (this.customization.metaKeywords == null || this.customization.metaKeywords.length == 0)
                this.customization.metaKeywords = this.defaultMetaKeywords;
            */
        }
    }

	constructor(
        private userService: UserService,
        private messageService: MessageService
        ) {

        this.customization = new StoreCustomization();
        this.customization.title = this.defaultTitle;
        this.customization.metaKeywords = this.defaultMetaKeywords;
    }
    
    ngOnInit(): void {
    }
}
