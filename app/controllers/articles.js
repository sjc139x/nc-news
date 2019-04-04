const { fetchArticles, fetchArticleByID, fetchCommentsByArticleID } = require('../models/articles');

function sendArticles (req, res, next) {
    fetchArticles(req.query)
    .then(articles => {
        res.status(200).send({ articles });
    });
};

//do we need below? not very dry...
function sendArticleByID (req, res, next) {
fetchArticleByID(req.params)
    .then(articles => {
        if (articles.length === 0) return Promise.reject({code: 404, msg: 'Article not found'})
        else res.status(200).send({ articles });
    })
    .catch(next);
};

function sendCommentsByArticleID (req, res, next) {
    fetchCommentsByArticleID({ ...req.params, ...req.query })
    .then(comments => {
        res.status(200).send({ comments });
    })
};

module.exports = { sendArticles, sendArticleByID, sendCommentsByArticleID };
