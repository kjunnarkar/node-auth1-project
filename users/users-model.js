const db = require('../database/db-config');

module.exports = {
    get,
    add,
    find
}

function get() {
    return db('users').select('id', 'username');
}

function add(user) {
    return db('users').insert(user);
}

function find(username) {
    return db('users').where(username);
}