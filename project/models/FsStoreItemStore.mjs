import fs from 'fs/promises';
import { AbstractProductStore } from "./Product.mjs";

const FILE_LOCATION = './data/products.json';

export class FsProductStore extends AbstractProductStore {
  async create() {

  }
  
  async read (key) {
    let buf = await fs.readFile(FILE_LOCATION);
    let data = JSON.parse(buf.toString());
    console.log(data);
    let product = data.find((product) => product.key == key);
    console.log('----', product)
    if (product) {
      return product;
    }
    
    throw Error('No such product');
  }

  async update() {

  }

  async delete() {

  }
}