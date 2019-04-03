const sendArticles = require('../controllers/articles');

const articlesRouter = require('express').Router();

articlesRouter.route('/').get(sendArticles);

module.exports = articlesRouter;