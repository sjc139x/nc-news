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

function addTopic (topicInfo) {
    return connection
    .insert({ description: topicInfo.description, slug: topicInfo.slug })
    .into('topics')
    .returning('*');
};

module.exports = { fetchTopics, checkTopic, addTopic };
