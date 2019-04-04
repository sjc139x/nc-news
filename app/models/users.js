const connection = require('../../db/connection');

function fetchUserByID ({ username }) {
    return connection
    .select('username', 'avatar_url', 'name')
    .from('users')
    .where('username', username)
};

module.exports = fetchUserByID;