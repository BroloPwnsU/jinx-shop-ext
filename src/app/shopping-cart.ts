import {CartItem} from './cart-item';

export class ShoppingCart {
	items: CartItem[] = [];

	getTotal(): number {

		return this.items.reduce( (tally, item) => {
			  return tally + (item.count * item.price);
			}, 0.0); 
	}

	populateFromJSON(cartStr: string): void {
		var genericCart = JSON.parse(cartStr);
		if (genericCart == null)
			return;

		if (genericCart.items != null)
			this.items = genericCart.items;
	}
}