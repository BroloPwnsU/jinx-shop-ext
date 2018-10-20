import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryProductDataService }  from './in-memory-product-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { ShopSwipeComponent } from './shop-swipe/shop-swipe.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartHeaderComponent } from './shopping-cart-header/shopping-cart-header.component';
import { ShopComponent } from './shop/shop.component';
import { ErrorPageMissingComponent } from './error-page-missing/error-page-missing.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ErrorPageMissingComponent,
    ShopComponent,
    ShopSwipeComponent,
    ShoppingCartComponent,
    ShoppingCartHeaderComponent,
    ProductDisplayComponent,
    CheckoutCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryProductDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
