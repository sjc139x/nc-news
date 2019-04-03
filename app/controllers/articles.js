const { fetchArticles, fetchArticleByID } = require('../models/articles');

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

module.exports = { sendArticles, sendArticleByID };
