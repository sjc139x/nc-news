const sendTopics = require('../controllers/topics');

const topicsRouter = require('express').Router();

topicsRouter.route('/').get(sendTopics);

module.exports = topicsRouter;