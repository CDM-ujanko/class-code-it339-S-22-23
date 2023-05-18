import express from "express";
import { engine } from 'express-handlebars';
import { FsProductStore } from "./models/FsProductStore.mjs";
import { Sqlite3ProductStore } from "./models/Sqlite3ProductStore.mjs";

const app = express();
const PORT = 3000;

const store = new Sqlite3ProductStore();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', async (req, res) => {
  let products = await store.list();
  res.render('index', {products});
})

app.get('/product/:id', async (req, res) => {
  let product = await store.read(req.params.id);
  res.render('product', { product });
})

app.get('/create', (req, res) => {
  res.render('product-edit');
})

app.get('/edit/:id', async (req, res) => {
  let product = await store.read(req.params.id);
  res.render('product-edit', {product, editMode: true});
});

app.get('/delete/:id', async (req, res) => {
  await store.delete(req.params.id);
  res.redirect('/');
});

app.post('/product', async (req, res) => {
  console.log('POST', req.body);
  let key = req.body.key;
  console.log('key!', key);
  if (key) {
    key = await store.update(req.body);
  } else {
    key = await store.create(req.body);
  }
  
  res.redirect('/product/' + key);
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
