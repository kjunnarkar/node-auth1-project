const express = require('express');
const restricted = require('../auth/restricted-middleware');

const router = express.Router();
const Users = require('./users-model');

router.get('/', restricted, (req, res, next) => {
    Users.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch (err => res.status(500).json({ error: 'Unauthorized: could not get users' }));
});

module.exports = router;
