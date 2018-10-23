import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
