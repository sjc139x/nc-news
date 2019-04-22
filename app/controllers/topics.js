const { fetchTopics, checkTopic, addTopic } = require('../models/topics');
const { checkTopicBodyFormat } = require('../../utils/utilFuncs');

function sendTopics (req, res, next) {
    fetchTopics()
    .then(topics => {
        return res.status(200).send({ topics });
    })
    .catch(next);
};

function sendAddedTopic (req, res, next) {
   if (checkTopicBodyFormat(req.body)) {
       addTopic(req.body)
       .then(([topic]) => {
           return res.status(201).send({ topic });
       }).catch(next);
   } else Promise.reject({code: 400}).catch(next);
};

module.exports = { sendTopics, sendAddedTopic };
