const { sendTopics, sendAddedTopic } = require('../controllers/topics');

const topicsRouter = require('express').Router();

topicsRouter.route('/').get(sendTopics).post(sendAddedTopic).all((req, res, next) => Promise.reject({ code: 405, msg: 'Method Not Allowed: only GET and POST methods are allowed on this route (/api/topics).' }).catch(next));

module.exports = topicsRouter;