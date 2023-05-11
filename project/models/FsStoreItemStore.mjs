import fs from 'fs/promises';
import { AbstractProductStore } from "./Product.mjs";

const FILE_LOCATION = './data/products.json';

export class FsProductStore extends AbstractProductStore {
  async create(product) {
    let buf = await fs.readFile(FILE_LOCATION);
    let data = JSON.parse(buf.toString());
    let key = 0;
    if (data.length > 0) {
      key = data[data.length - 1].key + 1;
    }
    product.key = key;
    data.push(product);

    await fs.writeFile(FILE_LOCATION, JSON.stringify(data, null, 2));
    return key;
  }
  
  async read (key) {
    let buf = await fs.readFile(FILE_LOCATION);
    let data = JSON.parse(buf.toString());
    let product = data.find((product) => product.key == key);
    if (product) {
      return product;
    }
    
    throw Error('No such product');
  }

  async update(product) {
    let buf = await fs.readFile(FILE_LOCATION);
    let data = JSON.parse(buf.toString());
    let index = data.findIndex((p) => p.key == product.key);
    if (index === -1) {
      throw Error('No such product');
    }

    data[index] = product;
    await fs.writeFile(FILE_LOCATION, JSON.stringify(data, null, 2));
    return product.key;
  }

  async delete() {

  }

  async list() {
    let buf = await fs.readFile(FILE_LOCATION);
    let data = JSON.parse(buf.toString());
    return data;
  }
}