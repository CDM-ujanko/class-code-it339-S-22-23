import { Router } from "express";
// import data from './data/data.js'
import db from './data/database-connector.js';

const router = new Router();

router.get('/', (req, res) => {
    res.json('OK!');
});

router.get('/student', (req, res) => {
    res.json(db.list());
});

router.get('/student/:index', (req, res) => {
    let index = parseInt(req.params.index);
    let user = db.find(index);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json('User not found!');
    }
});

router.post('/student', (req, res) => {
    let student = req.body;
    res.json(db.create(student));
});

router.put('/student', (req, res) => {
    res.json(db.update(req.body));
});

router.delete('/student/:id', (req, res) => {
    if (db.delete(parseInt(req.params.id))) {
        res.json('OK!');
    } else {
        res.status(404).json('Invalid id!');
    }
});



export default router;