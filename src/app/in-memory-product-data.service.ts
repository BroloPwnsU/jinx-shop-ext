import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';

export class InMemoryProductDataService implements InMemoryDbService {

  createDb() {
    const products = [
      { 
        name: "Cool T-Shirt",

        colorName: "Red",
        colorHex: "f00",

        id: 111,
        colorId: 2,

        price: 19.99,
        
        sizes: [
          {
            name: "Small",
            abbreviation: "S",

            id: 1,
            itemId: 123451,

            available: true
          },
          {
            name: "Medium",
            abbreviation: "M",

            id: 2,
            itemId: 123452,

            available: true
          },
          {
            name: "Large",
            abbreviation: "L",

            id: 3,
            itemId: 123453,

            available: false
          },
          {
            name: "X-Large",
            abbreviation: "XL",

            id: 4,
            itemId: 123454,

            available: true
          }
        ]
      },

      { 
        name: "Rad T-Shirt",

        colorName: "Blue",
        colorHex: "00f",

        id: 112,
        colorId: 3,

        price: 120.99,
        
        sizes: [
          {
            name: "Small",
            abbreviation: "S",

            id: 1,
            itemId: 223451,

            available: true
          },
          {
            name: "Medium",
            abbreviation: "M",

            id: 2,
            itemId: 223452,

            available: true
          },
          {
            name: "Large",
            abbreviation: "L",

            id: 3,
            itemId: 223453,

            available: false
          },
          {
            name: "X-Large",
            abbreviation: "XL",

            id: 4,
            itemId: 223454,

            available: true
          }
        ]
      },

      { 
        name: "Bitchin' T-Shirt",

        colorName: "Green",
        colorHex: "0f0",

        id: 113,
        colorId: 3,

        price: 1.99,
        
        sizes: [
          {
            name: "Small",
            abbreviation: "S",

            id: 1,
            itemId: 323451,

            available: true
          },
          {
            name: "Medium",
            abbreviation: "M",

            id: 2,
            itemId: 323452,

            available: true
          },
          {
            name: "Large",
            abbreviation: "L",

            id: 3,
            itemId: 323453,

            available: false
          },
          {
            name: "X-Large",
            abbreviation: "XL",

            id: 4,
            itemId: 323454,

            available: true
          }
        ]
      }
    ];
    return {products};
  }

  // Overrides the genId method to ensure that a product always has an id.
  // If the products array is empty,
  // the method below returns the initial number (11).
  // if the products array is not empty, the method below returns the highest
  // product id + 1.
  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}