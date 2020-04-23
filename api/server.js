const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// Bring in express session and connect-session-knex modules  
const session = require('express-session'); // manages session

// Brings in session object and stores session data in db
const knexSessionStore = require('connect-session-knex')(session); 

const restricted = require('../auth/restricted-middleware');
const registerRouter = require('../auth/register-router');
const loginRouter = require('../auth/login-router');
const usersRouter = require('../users/users-router');

const server = express();

const sessionConfig = {
    name: 'rocky-road',
    secret: 'my-favorite',
    cookie: {
        maxAge: 7200 * 1000,
        secure: false, // true in production
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false, // for GDPR compliance

    store: new knexSessionStore(
        {
            knex:require('../database/db-config'),
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 7200 * 1000
        }
    )
}

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

server.use(session(sessionConfig)); // use session config object

server.use('/api/users', restricted, usersRouter);
server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);

server.get('/', (req, res) => {
    res.send({ message: 'Success: The Users API is running' });
});

module.exports = server;
