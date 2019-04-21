const { fetchArticles, fetchArticleByID, fetchCommentsByArticleID, updateArticle, postComment } = require('../models/articles');
const { checkTopic } = require('../models/topics');
const { checkUser } = require('../models/users');

function sendArticles (req, res, next) {
    fetchArticles(req.query)
    .then(articles => {
        if ((req.query.order) && (req.query.order !== 'asc' && req.query.order !== 'desc')) return Promise.reject({code: 400});
        
        else if (articles.length === 0 && req.query.topic) {
            checkTopic(req.query.topic).then(([topic]) => {
                if (topic) res.status(204).send();
                else Promise.reject({code: 404}).catch(next);
            });
        }
        
        else if (articles.length === 0 && req.query.author) {
            checkUser(req.query.author).then(([author]) => {
                if (author) res.status(204).send();
                else Promise.reject({code: 404}).catch(next);
            });
        }
        
        else res.status(200).send({ articles });
    })
    
    .catch(next);
};

function sendArticleByID (req, res, next) {
    fetchArticleByID(req.params)
    .then(([articles]) => {
        res.status(200).send({ articles });
    })
    .catch(next);
};

function sendCommentsByArticleID (req, res, next) {
    fetchCommentsByArticleID({ ...req.params, ...req.query })
    .then(comments => {
        res.status(200).send({ comments });
    })
    .catch(next);
};

function sendUpdatedArticle (req, res, next) {
    updateArticle({ ...req.params, ...req.body })
    .then(([article]) => {
        res.status(200).send({ article });
    })
    .catch(next);
};

function sendPostedComment (req, res, next) {
    postComment([ req.params, req.body ])
    .then(([comment]) => {
        res.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = { sendArticles, sendArticleByID, sendCommentsByArticleID, sendUpdatedArticle, sendPostedComment };
