const { fetchArticles, fetchArticleByID, fetchCommentsByArticleID } = require('../models/articles');

function sendArticles (req, res) {
    fetchArticles(req.query)
    .then(articles => {
        res.status(200).send({ articles });
    });
};

//do we need below? not very dry...
function sendArticleByID (req, res) {
    fetchArticleByID(req.params)
    .then(articles => {
        res.status(200).send({ articles });
    });
};

function sendCommentsByArticleID (req, res) {
    fetchCommentsByArticleID(req.params)
    .then(comments => {
        res.status(200).send({ comments });
    })
};

module.exports = { sendArticles, sendArticleByID, sendCommentsByArticleID };
