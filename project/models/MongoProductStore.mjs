import { default as mongodb, ObjectId } from 'mongodb';
import { AbstractProductStore } from "./Product.mjs"

const MongoClient = mongodb.MongoClient;

let port = process.env.MONGODB_PORT,
    host = process.env.MONGODB_HOST;
    
const db = await (async () => {
  let client = await MongoClient.connect(`mongodb://${host}:${port}`);
  return client.db(process.env.MONGODB_DATABASE);
})();

const products = db.collection('products');

export class MongoProductStore extends AbstractProductStore {
  async create(product) {
    let res = await products.insertOne({
      name: product.name,
      description: product.description,
      price: product.price,
      image: []
    })

    console.log('created', res);
    return res.insertedId;
  }

  async read (key) {
    let product = await products.findOne(new ObjectId(key));
    console.log('Found a product!', product);
    product.key = product._id;
    return product;
  }

  async update(product) {
    await products.updateOne({_id: new ObjectId(product.key)}, {
      $set: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: []
      }
    })
    return product.key;
  }

  async delete(key) {
    await products.findOneAndDelete({_id: new ObjectId(key)});
    return true;
  }

  async list() {
    return await products.find().map(p => {
      p.key = p._id;
      return p;
    }).toArray();
  }
}