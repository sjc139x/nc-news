const knex = require('knex');
const iam_apikey = process.env.NODE_ENV === 'production' ? process.env : require('../knexfile');

const connection = knex(iam_apikey);

module.exports = connection;
