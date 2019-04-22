const { sendArticles, sendArticleByID, sendCommentsByArticleID, sendUpdatedArticle, sendPostedComment, sendAddedArticle, confirmDeletedArticle } = require('../controllers/articles');

const articlesRouter = require('express').Router();

articlesRouter.route('/').get(sendArticles).post(sendAddedArticle).all((req, res, next) => Promise.reject({code: 405}).catch(next));
articlesRouter.route('/:article_id').get(sendArticleByID).patch(sendUpdatedArticle).delete(confirmDeletedArticle).all((req, res, next) => Promise.reject({code: 405}).catch(next));
articlesRouter.route('/:article_id/comments').get(sendCommentsByArticleID).post(sendPostedComment).all((req, res, next) => Promise.reject({code: 405}).catch(next));

module.exports = articlesRouter;