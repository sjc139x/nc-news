const { fetchArticles, fetchArticleByID, fetchCommentsByArticleID, updateArticle } = require('../models/articles');

function sendArticles (req, res, next) {
    fetchArticles(req.query)
    .then(articles => {
        if ((req.query.order) && (req.query.order !== 'asc' || req.query.order !== 'desc')) return Promise.reject({code: 400});
        else res.status(200).send({ articles });
    })
    .catch(next);
};

//do we need below? not very dry...
function sendArticleByID (req, res, next) {
    fetchArticleByID(req.params)
    .then(articles => {
        if (articles.length === 0) return Promise.reject({code: 404, msg: 'Article Not Found'});
        else res.status(200).send({ articles });
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
    // console.log(req.body)
    updateArticle({ ...req.params, ...req.body })
    .then(article => {
        res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = { sendArticles, sendArticleByID, sendCommentsByArticleID, sendUpdatedArticle };
