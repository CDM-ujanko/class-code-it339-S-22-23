import sqlite3 from 'sqlite3';
import { AbstractProductStore } from "./Product.mjs";

const db = await new sqlite3.Database('./data/sqlite3');

db.run(`CREATE TABLE IF NOT EXISTS products (
  key INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  price FLOAT(10, 2) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  images JSON
)`);

export class Sqlite3ProductStore extends AbstractProductStore {
  async create(product) {
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO products(name, price, description) VALUES( ?, ?, ?) `,
       [product.name, product.price, product.description], (err, row) => {
        if (err) {
          return reject(err);
        }

        console.log(row);
        return resolve(row.key);
      });
    })
  }

  async read(key) {
    return await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM products WHERE key = ?`, key, (err, row) => {
        if (err) {
          return reject(err);
        }

        return resolve(row);
      })
    });
  }

  async update(product) {
    await new Promise((resolve, reject) => {
      db.run(`UPDATE products SET name = ?, price = ?, description = ? WHERE key = ?`,
       [product.name, product.price, product.description, product.key], (err, row) => {
        if (err) {
          return reject(err);
        }

        return resolve(this.lastID);
      });
    })
  }

  async delete(key) {
    await new Promise((resolve, reject) => {
      db.run(`DELETE FROM products WHERE key = ?`, key, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(true);
      })
    });

  }

  async list() {
    return await new Promise((resolve, reject) => {
      db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
          return reject(err);
        }

        return resolve(rows);
      })
    });
  }
}