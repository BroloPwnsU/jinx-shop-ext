import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { ShopSwipeComponent } from './shop-swipe/shop-swipe.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartHeaderComponent } from './shopping-cart-header/shopping-cart-header.component';
import { ShopComponent } from './shop/shop.component';
import { ErrorPageMissingComponent } from './error-page-missing/error-page-missing.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component';
import { ProductImageComponent } from './product-image/product-image.component';
import { ProductPictureDirective } from './directives/product-picture.directive';

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
    CheckoutCompleteComponent,
    ShopListComponent,
    LoadingPanelComponent,
    ProductImageComponent,
    ProductPictureDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTableModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
