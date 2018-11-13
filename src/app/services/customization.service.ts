import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {MessageService} from './message.service';

import {StoreCustomization} from '../classes/store-customization';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomizationService implements OnInit {
    //CustomizationService provides data for the channel

    defaultTitle = "Shroud Merch Booth - powered by J!NX";
    defaultMetaKeywordIds = ["1"];
    defaultProductsIds: ["9036", "8806", "9382"]

    customization: StoreCustomization;

    //customizationUrl: string = "http://localhost:8112/channels";
    customizationUrl: string = "http://twitchapistaging.jinx.com/channels";

    getCustomization(): Observable<StoreCustomization> {
        if (this.customization != null) {
            //TODO: Use the channelId to load the customization, and set the defaults
            return new Observable<StoreCustomization>((observer) => {
                observer.next(this.customization);
            });
        }
        else {

            let userAuth = this.userService.getUserAuth();
            
            let storeCustomUrl: string = `${this.customizationUrl}/get_store_config.json?channelid=${userAuth.channelId}`;
    
            return this.http.get<StoreCustomization>(storeCustomUrl)
                .pipe(
                    tap(customization => { this.customization = customization; this.log('Fetched customization.'); })
                    , catchError(this.handleError('getCustomization', null))
                );
            
            /*
            //Use the channelId to load the customization.
            //TODO: Set defaults.
            if (this.customization.title == null || this.customization.title == "")
                this.customization.title = this.defaultTitle;
            */
        }
    }

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	 
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	 
	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);
	 
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

	private log(message: string) {
		this.messageService.add(`ProductService: ${message}`);
	}

	constructor(
        private userService: UserService,
        private messageService: MessageService,
		private http: HttpClient
        ) {

        /*
        this.customization = new StoreCustomization();
        this.customization.title = this.defaultTitle;
        this.customization.metaKeywordIds = this.defaultMetaKeywordIds;
        this.customization.productIds = this.defaultProductsIds;
        */
    }
    
    ngOnInit(): void {
    }
}
