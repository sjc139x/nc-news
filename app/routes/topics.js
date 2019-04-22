const { sendTopics, sendAddedTopic } = require('../controllers/topics');

const topicsRouter = require('express').Router();

topicsRouter.route('/').get(sendTopics).post(sendAddedTopic);

module.exports = topicsRouter;