const bcrypt = require('bcryptjs');

const express = require('express');
const router = express();

const Users = require('../users/users-model');

router.post('/', (req, res, next) => {
    const { username, password } = req.body;

    Users.find({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = username;
                res.status(200).json({ message: `Hello ${username}` })
            }
            else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => next(error));
});

const errorHandler = ((error, req, res, next) => {
    res.status(500).json({ error: 'Server error: unable to login' });
    next();
});

router.use(errorHandler);

module.exports = router;
