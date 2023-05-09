import express from "express";
import { engine } from 'express-handlebars';
import { FsProductStore } from "./models/FsStoreItemStore.mjs";

const app = express();
const PORT = 3000;

const store = new FsProductStore();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/product/:id', (req, res) => {
  let product = store.read(req.params.id);
  res.render('product', { product });
})


app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
