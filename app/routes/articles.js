const { sendArticles, sendArticleByID, sendCommentsByArticleID, sendUpdatedArticle, sendPostedComment } = require('../controllers/articles');

const articlesRouter = require('express').Router();

articlesRouter.route('/').get(sendArticles).all((req, res, next) => Promise.reject({code: 405}).catch(next));
articlesRouter.route('/:article_id').get(sendArticleByID).patch(sendUpdatedArticle).all((req, res, next) => Promise.reject({code: 405}).catch(next));
articlesRouter.route('/:article_id/comments').get(sendCommentsByArticleID).post(sendPostedComment).all((req, res, next) => Promise.reject({code: 405}).catch(next));

module.exports = articlesRouter;