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

router.delete('/logout', (req, res, next) => {
    
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).json({ message: 'Unable to logout', err})
            }
            else {
                res.send('Successfully Logged Out')
            }
        })
    }
    else {
        res.end()
    }
});

module.exports = router;
