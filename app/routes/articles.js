const { sendArticles, sendArticleByID, sendCommentsByArticleID, sendUpdatedArticle } = require('../controllers/articles');

const articlesRouter = require('express').Router();

articlesRouter.route('/').get(sendArticles);
articlesRouter.route('/:article_id').get(sendArticleByID).patch(sendUpdatedArticle);
articlesRouter.route('/:article_id/comments').get(sendCommentsByArticleID);

module.exports = articlesRouter;