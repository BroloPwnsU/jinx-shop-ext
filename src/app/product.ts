import {SizeItem} from './size';

export class Product {

	name: string;

	colorName: string;
	colorHex: string;

	id: number;
	colorId: number;

	price: number;
	
	sizes: SizeItem[];
}