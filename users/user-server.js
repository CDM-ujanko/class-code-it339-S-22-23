import * as dotenv from 'dotenv';
dotenv.config();

import restify from 'restify';
import User from './user-serialize.js';

const app = restify.createServer({
  name: 'User-Auth-Service',
  version: '0.0.1'
});

app.use(restify.plugins.acceptParser(app.acceptable));
app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser());

app.listen(process.env.PORT, () => {
  console.log(`App ${app.name} listening on: ${app.url}`)
});

app.get('/', (req, res, next) => {
  res.send('hello world!!');
})

app.get('/users', (req, res, next) => {
  res.send('ok!');
});

// Get an existing user
app.get('/users/:username', (req, res, next) => {
  res.send('ok! ' + req.params.username);
});

// Create a new user
app.post('/users', (req, res, next) => {
  res.send('ok!');
});

app.put('/users/:username', (req, res, next) => {
  // Update (or create) the user!
  res.send('ok!');
})

// Delete the user
app.del('/users', (req, res, next) => {
  res.send('ok!');
});
