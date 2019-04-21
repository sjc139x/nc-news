const { fetchTopics, checkTopic } = require('../models/topics');

function sendTopics (req, res, next) {
    fetchTopics()
    .then(topics => {
        return res.status(200).send({ topics });
    })
    .catch(next);
};

module.exports = sendTopics;
