import {CartItem} from './cart-item';

export class ShoppingCart {
	items: CartItem[] = [];

	getTotal(): number {

		return this.items.reduce( (tally, item) => {
			  return tally + (item.count * item.price);
			}, 0.0); 
	}
}