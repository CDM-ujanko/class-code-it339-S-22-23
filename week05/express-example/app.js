import express from "express";
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";

import api from './api.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// parse application/json
app.use(bodyParser.json())

app.use('/api', api);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});

app.get('/', (req, res) => {
    res.render('home', {name: 'Bob', time: new Date(), items: ['one', 'two', 'seven']});
});

app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send(req.params.name);
});

app.get('/about', (req, res) => {
    res.render('about');
});

let todoItems = [];

app.get('/todo', (req, res) => {
    res.render('todo', {items: todoItems});
});

app.get('/todo/add/:item', (req, res) => {
    todoItems.push(req.params.item);
    res.send('OK!');
})

// app.get('/api', (req, res) => {
//     res.json({
//         path: req.path,
//         domain: req.domain,
//         port: req.port,
//         protocol: req.protocol,
//         query: req.query
//     });
// })
