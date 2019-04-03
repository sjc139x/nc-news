const fetchArticles = require('../models/articles');

function sendArticles (req, res) {
    fetchArticles(req.query)
    .then(articles => {
        res.status(200).send({ articles });
    });
};

module.exports = sendArticles;
