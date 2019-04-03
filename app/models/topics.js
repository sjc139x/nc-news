const connection = require('../../db/connection');

function fetchTopics() {
    return connection
    .select('slug', 'description')
    .from('topics')
};

module.exports = fetchTopics;
