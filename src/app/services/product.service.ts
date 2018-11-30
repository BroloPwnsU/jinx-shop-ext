import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import {Product} from '../classes/product';
import {MessageService} from '../services/message.service';
import { CustomizationService } from './customization.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
	
	private productsUrl = environment.backendBaseUrl + '/products';  // URL to web api
	private photosBaseUrl = environment.photosBaseUrl;
	
	getProducts(): Observable<Product[]> {

		let keywordString = this.buildMetaKeywordIdString();
		let productString = this.buildProductIdString();
		let storeProductUrl: string = `${this.productsUrl}/get_products.json?productids=${productString}&keywordids=${keywordString}`;

		return this.http.get<Product[]>(storeProductUrl)
		    .pipe(
		    	tap((products) => {
					for(var j = 0; j < products.length; j++) {
						products[j].photoStubs = new Array();
						for (var i = 0; i < products[j].numberOfPhotos; i++) {
							products[j].photoStubs.push(`${this.photosBaseUrl}/productimage/${products[j].id}/${products[j].colorId}/${i+1}/`);
						}
					}
					this.log('Fetched products');
				})
		    	, catchError(this.handleError('getProducts', []))
		    );
	}

	/*
	getProduct(id: number): Observable<Product> {
		const url = `${this.productsUrl}/${id}`;

		return this.http.get<Product>(url).pipe(
				tap(_ => this.log(`fetched Product id=${id}`))
				, catchError(this.handleError<Product>(`getProduct id=${id}`))
			);
	}
	*/

	/* GET products whose name contains search term */
	searchProducts(term: string): Observable<Product[]> {
		if (!term.trim()) {
			// if not search term, return empty hero array.
			return of([]);
		}
		return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`).pipe(
			tap(_ => this.log(`found products matching "${term}"`)),
			catchError(this.handleError<Product[]>('searchProducts', []))
		);
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

	private buildMetaKeywordIdString(): string {
		let commaDelimited: string = "";
		let metaKeywordIds = this.customizationService.customization.metaKeywordIds;
		if (metaKeywordIds == null || metaKeywordIds.length == 0)
			return commaDelimited;

		//Cart is represented by itemid/count pairs.
		commaDelimited = metaKeywordIds.reduce( (tally, id) => {
			return `${id},` + tally;
		}, "");

		//Cut off the last semicolon.
		return commaDelimited.slice(0, commaDelimited.length - 1);
    }
    
	private buildProductIdString(): string {
		let commaDelimited: string = "";
		let productIds = this.customizationService.customization.productIds;
		if (productIds == null || productIds.length == 0)
			return commaDelimited;

		//Cart is represented by itemid/count pairs.
		commaDelimited = productIds.reduce( (tally, id) => {
			return `${id},` + tally;
		}, "");

		//Cut off the last semicolon.
		return commaDelimited.slice(0, commaDelimited.length - 1);
	}

	constructor(
		private http: HttpClient,
		private customizationService: CustomizationService,
		private messageService: MessageService
		) 
	{ }
}
