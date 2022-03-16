const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/user', (req, res, next) => {
    res.status(201).json({ message: 'Utilisateur créé !' })
});

app.get('/api/user', (req, res, next) => {
    const user = [
        {
            _id: "",
            last_name: "",
            first_name: "",
            email: "",
            birthday: "",
            is_admin: ""
        }
    ];
    res.status(200).json(user);
});

module.exports = app;