const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();

const Users = require('../users/users-model');

router.post('/', async (req, res, next) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    
    try {
        const registered = await Users.add(user);
        res.status(201).json(registered);
    }
    catch (error) {
        next(error);
    }
});

const errorHandler = ((error, req, res, next) => {
    res.status(500).json({ error: 'Check data and retry' });
});

router.use(errorHandler);

module.exports = router;
