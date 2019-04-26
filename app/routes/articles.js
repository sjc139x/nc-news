const { sendArticles, sendArticleByID, sendCommentsByArticleID, sendUpdatedArticle, sendPostedComment, sendAddedArticle, confirmDeletedArticle } = require('../controllers/articles');

const articlesRouter = require('express').Router();

articlesRouter.route('/').get(sendArticles).post(sendAddedArticle).all((req, res, next) => Promise.reject({ code: 405, msg: 'Method Not Allowed: only GET and POST methods are allowed on this route (/api/articles).' }).catch(next));
articlesRouter.route('/:article_id').get(sendArticleByID).patch(sendUpdatedArticle).delete(confirmDeletedArticle).all((req, res, next) => Promise.reject({ code: 405, msg: 'Method Not Allowed: only GET, PATCH and DELETE methods are allowed on this route (/api/articles/:article_id).' }).catch(next));
articlesRouter.route('/:article_id/comments').get(sendCommentsByArticleID).post(sendPostedComment).all((req, res, next) => Promise.reject({ code: 405, msg: 'Method Not Allowed: only GET and POST methods are allowed on this route (/api/articles/:article_id/comments).' }).catch(next));

module.exports = articlesRouter;