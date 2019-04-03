const { sendArticles, sendArticleByID } = require('../controllers/articles');

const articlesRouter = require('express').Router();

articlesRouter.route('/').get(sendArticles);
articlesRouter.route('/:article_id').get(sendArticleByID);

module.exports = articlesRouter;