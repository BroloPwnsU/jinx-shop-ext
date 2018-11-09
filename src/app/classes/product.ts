import {SizeItem} from './size-item';

export class Product {

	name: string;

	colorName: string;
	colorHex: string;

	id: number;
	colorId: number;

	numberOfPhotos: number;

	presaleDate: string;

	photoStubs: string[];
	
	sizes: SizeItem[];
}