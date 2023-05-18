import mysql from 'mysql';
import { AbstractProductStore } from "./Product.mjs";

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'it339-s-22-23'
});

db.connect();

db.query(`CREATE TABLE IF NOT EXISTS products (
  \`key\` INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price FLOAT(10, 2) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  images JSON
)`);

export class MySqlProductStore extends AbstractProductStore {
  async create(product) {
    return await new Promise((resolve, reject) => {
      db.query(`INSERT INTO products(name, price, description) VALUES( ?, ?, ?) `,
       [product.name, product.price, product.description], (err, res) => {
        if (err) {
          return reject(err);
        }

        console.log('Created!', res);
        return resolve(res.insertId);
      });
    })
  }

  async read(key) {
    return await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE \`key\` = ?`, key, (err, rows) => {
        if (err) {
          return reject(err);
        }

        console.log('Reading', rows)
        return resolve(rows[0]);
      });
    });
  }

  async update(product) {
    return await new Promise((resolve, reject) => {
      db.query(`UPDATE products SET name = ?, price = ?, description = ? WHERE \`key\` = ?`,
       [product.name, product.price, product.description, product.key], (err, res) => {
        if (err) {
          return reject(err);
        }

        console.log('Updated', res);

        return resolve(product.key);
      });
    })
  }

  async delete(key) {
    return await new Promise((resolve, reject) => {
      db.query(`DELETE FROM products WHERE \`key\` = ?`, key, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(true);
      })
    });

  }

  async list() {
    return await new Promise((resolve, reject) => {
      db.query('SELECT * FROM products', (err, rows) => {
        if (err) {
          return reject(err);
        }

        return resolve(rows);
      })
    });
  }
}