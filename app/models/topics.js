const connection = require('../../db/connection');

function fetchTopics () {
    return connection
    .select('slug', 'description')
    .from('topics')
};

function checkTopic (slug) {
    return connection
    .select('slug')
    .from('topics')
    .where('slug', slug)
    .then((res) => {
        return res;
    });
};

module.exports = { fetchTopics, checkTopic };
