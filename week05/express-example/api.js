import { Router } from "express";
import data from './data/data.js'

const router = new Router();

router.get('/', (req, res) => {
    res.json('OK!');
});

router.get('/student', (req, res) => {
    res.json(data);
});

router.get('/student/:id', (req, res) => {
    let user = data.find((u) => u.index === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json('User not found!');
    }
});

router.post('/student', (req, res) => {
    let student = req.body;
    student.index = data.length;
    data.push(student)
    res.json(student);
});

router.put('/student', (req, res) => {
    let student = req.body;
    let index = data.findIndex((u) => u.index === parseInt(student.index));
    if (index !== -1) {
        data[index] = student;
    } else {
        data.push(student)
    }

    res.json(student);
});

router.delete('/student/:id', (req, res) => {
    let index = data.findIndex((u) => u.index === parseInt(req.params.id));
    if (index !== -1) {
        data.splice(index, 1);
        res.json('OK!');
    } else {
        res.status(404).json('Invalid id!');
    }
});



export default router;