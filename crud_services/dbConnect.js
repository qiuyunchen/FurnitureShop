const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/furniture');

module.exports = db;