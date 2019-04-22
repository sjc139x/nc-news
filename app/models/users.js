const connection = require('../../db/connection');

function fetchUsers () {
    return connection
    .select('username', 'avatar_url')
    .from('users');
};

function fetchUserByID ({ username }) {
    return connection
    .select('username', 'avatar_url', 'name')
    .from('users')
    .where('username', username);
};

function checkUser (username) {
    return connection
    .select('username')
    .from('users')
    .where('username', username)
    .then((res) => {
        return res;
    });
};

module.exports = { fetchUsers, fetchUserByID, checkUser };