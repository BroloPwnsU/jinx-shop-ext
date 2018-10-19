import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { ShopComponent } from './shop/shop.component';
import { ErrorPageMissingComponent } from './error-page-missing/error-page-missing.component';


const routes: Routes = [
	{ path: 'shop', component: ShopComponent },
	{ path: 'checkout', component: CheckoutComponent },
	{ path: 'complete', component: CheckoutCompleteComponent },
	{ path: '', redirectTo: 'shop', pathMatch: 'full' },
	{ path: '**', component: ErrorPageMissingComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
	

}
