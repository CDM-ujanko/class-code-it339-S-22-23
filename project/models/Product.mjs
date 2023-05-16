class Product {
  #key;
  #name;
  #price;
  #description;
  #images;

  constructor(key, name, description, price, images = [])  {
    this.#key = key;
    this.#name = name;
    this.#price = price;
    this.#description = description;
    this.#images = images;
  }

  get key() {
    return this.#key;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get price() {
    return this.#price;
  }

  set price(price) {
    this.#price = price;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    this.#description = description;
  }

  get images() {
    return this.#images;
  }

  set images(images) {
    this.#images = images;
  }
}

class AbstractProductStore {
  async create(product) {}
  async read (key) {}
  async update(product) {}
  async delete(key) {}
  async list() {}
}

export {
  Product,
  AbstractProductStore
}