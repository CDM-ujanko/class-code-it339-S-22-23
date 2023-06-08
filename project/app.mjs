import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

import { engine } from 'express-handlebars';
// import { FsProductStore } from "./models/FsProductStore.mjs";
// import { Sqlite3ProductStore } from "./models/Sqlite3ProductStore.mjs";
// import { MySqlProductStore } from "./models/MySqlProductStore.mjs";
import { MongoProductStore } from "./models/MongoProductStore.mjs";
import * as userModel from './models/UserSuperagent.mjs';

const LocalStrategy = passportLocal.Strategy;

const app = express();
const PORT = process.env.PORT;

const store = new MongoProductStore();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('./public'));

app.use(session({
  secret: 'keyboard mouse',
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
})

passport.use(new LocalStrategy(async (username, password, done) => {
  console.log('Trying to login', username);
  try {
    let res = await userModel.check(username, password),
        user = res.data;

    if (user) {
      console.log('The user has logged in!', username);
      done(null, {id: user.username, username: user.username});
    } else {
      console.log('The username or password combo did not work!', username);
      done(null, false, 'Invalid username/password');
    }
  } catch (e) {
    done(e)
  }
}))

passport.serializeUser((user, done) => {
    try {
        console.log('serialize user', user);
        done(null, user.username);
    } catch (e) {
        done(e);
    }
})

passport.deserializeUser(async (username, done) => {
  try {
    console.log('deserializeUser', username);
    let res = await userModel.find(username);
    done(null, res.data);
  } catch (e) {
    done(e)
  }
})

function authenticate(req, res, next) {
  console.log('authenticate');
  try {
    if (req.user) {
      console.log('The user is logged in!');
      next();
    } else {
      console.log('The user is not logged in!');
      res.redirect('/login');
    }
  } catch (e) {
    next(e)
  }
}

app.get('/', async (req, res) => {
  let products = await store.list();
  res.render('index', { products });
})

app.get('/product/:id', async (req, res) => {
  let product = await store.read(req.params.id);
  res.render('product', { product });
})

app.get('/create', authenticate, (req, res) => {
  res.render('product-edit');
})

app.get('/edit/:id', authenticate, async (req, res) => {
  let product = await store.read(req.params.id);
  res.render('product-edit', { product, editMode: true });
});

app.get('/delete/:id', authenticate, async (req, res) => {
  await store.delete(req.params.id);
  res.redirect('/');
});

app.post('/product', authenticate, async (req, res) => {
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

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
