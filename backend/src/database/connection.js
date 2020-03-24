/*  

This file is to connect the routes.js with the database

*/

const knex = require('knex')
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;