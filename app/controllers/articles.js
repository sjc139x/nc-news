const { fetchArticles, fetchArticleByID, fetchCommentsByArticleID, updateArticle, postComment, checkArticle, addArticle, deleteArticle } = require('../models/articles');
const { checkTopic } = require('../models/topics');
const { checkUser } = require('../models/users');
const { checkCommentBodyFormat, checkArticleBodyFormat } = require('../../utils/utilFuncs');

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
    checkArticle(req.params.article_id)
    .then(([response]) => {
        if (response) {
            fetchArticleByID(req.params)
            .then(([articles]) => {
                res.status(200).send({ articles });
            });
        } else Promise.reject({code: 404}).catch(next);
    });
};

function sendCommentsByArticleID (req, res, next) {
    checkArticle(req.params.article_id)
    .then(([article_id]) => {
        if (article_id) {
            fetchCommentsByArticleID({ ...req.params, ...req.query })
            .then(comments => {
    
                if (comments.length !== 0) return res.status(200).send({ comments });
                else return res.status(204).send();

            }).catch(next);

        } else Promise.reject({code: 404}).catch(next);
    }).catch(next);
};

function sendUpdatedArticle (req, res, next) {
        updateArticle({ ...req.params, ...req.body })
        .then(([article]) => {
            res.status(200).send({ article });
        })
        .catch(next);
};

function sendPostedComment (req, res, next) {
    Promise.all([checkArticle(req.params.article_id), checkUser(req.body.username || 'no-username-given'), checkCommentBodyFormat(req.body)])
    .then(([[article], [user], checkFormat]) => {
        if (article) {
            if (user && checkFormat) {
                postComment([ req.params, req.body ])
                .then(([comment]) => {
                    return res.status(201).send({ comment });
                })
                .catch(next);
            } else Promise.reject({code: 400}).catch(next);
        } else Promise.reject({code: 404}).catch(next);
    }).catch(next);
};

function sendAddedArticle (req, res, next) {
    if (checkArticleBodyFormat(req.body)) {
        addArticle(req.body)
        .then(([article]) => {
            return res.status(201).send({ article });
        }).catch(next);
    } else Promise.reject({code: 400}).catch(next);
};

function confirmDeletedArticle (req, res, next) {
    checkArticle(req.params.article_id)
    .then(([article]) => {
        if (article) {
            deleteArticle(req.params.article_id)
            .then(() => res.status(204).send());
        } else Promise.reject({code: 404}).catch(next);
    }).catch(next);
};

module.exports = { sendArticles, sendArticleByID, sendCommentsByArticleID, sendUpdatedArticle, sendPostedComment, sendAddedArticle, confirmDeletedArticle };
