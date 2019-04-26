const { fetchArticles, fetchArticleByID, fetchCommentsByArticleID, updateArticle, postComment, checkArticle, addArticle, deleteArticle } = require('../models/articles');
const { checkTopic } = require('../models/topics');
const { checkUser } = require('../models/users');
const { checkCommentBodyFormat, checkArticleBodyFormat } = require('../../utils/utilFuncs');

function sendArticles (req, res, next) {
    fetchArticles(req.query)
    .then(articles => {
        if ((req.query.order) && (req.query.order !== 'asc' && req.query.order !== 'desc')) {
            return Promise.reject({ code: 400, msg: `Bad Request: "${req.query.order}" is not a valid order.` });
        }
        
        else if (articles.length === 0 && req.query.topic) {
            checkTopic(req.query.topic).then(([topic]) => {
                if (topic) res.status(204).send();
                else Promise.reject({ code: 404, msg: `Resource Not Found: "${req.query.topic}" is not a valid topic.` }).catch(next);
            });
        }
        
        else if (articles.length === 0 && req.query.author) {
            checkUser(req.query.author).then(([author]) => {
                if (author) res.status(204).send();
                else Promise.reject({ code: 404, msg: `Resource Not Found: "${req.query.author}" is not a valid author.` }).catch(next);
            });
        }
        
        else res.status(200).send({ articles, total_count: articles.length });
    })

    .catch(next);
};

function sendArticleByID (req, res, next) {
    checkArticle(req.params.article_id)
    .then(([article]) => {
        if (article) {
            fetchArticleByID(req.params)
            .then(([articles]) => {
                res.status(200).send({ articles });
            });
        } else Promise.reject({ code: 404, msg: `Resource Not Found: there are no articles with an id of "${req.params.article_id}".` }).catch(next);
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

        } else Promise.reject({ code: 404, msg: `Resource Not Found: there are no articles (and therefore no comments) with an id of "${req.params.article_id}".` }).catch(next);
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
            if (checkFormat) {
                if (user) {
                    postComment([ req.params, req.body ])
                    .then(([comment]) => {
                        return res.status(201).send({ comment });
                    }).catch(next);
                } else Promise.reject({ code: 422, msg: `Unprocessable Entity: "${req.body.username}" is not a registered user, and therefore cannot post comments.` }).catch(next);
            } else Promise.reject({ code: 400, msg: 'Bad Request: request body is not in the correct format (username and body are both required fields).' }).catch(next);
        } else Promise.reject({ code: 404, msg: `Resource Not Found: there are no articles with an id of "${req.params.article_id}", so comment cannot be posted.` }).catch(next);
    }).catch(next);
};

function sendAddedArticle (req, res, next) {
    if (checkArticleBodyFormat(req.body)) {
        addArticle(req.body)
        .then(([article]) => {
            return res.status(201).send({ article });
        }).catch(next);
    } else Promise.reject({ code: 400, msg: 'Bad Request: request body is not in the correct format (title, body, author & topic are all required fields).' }).catch(next);
};

function confirmDeletedArticle (req, res, next) {
    checkArticle(req.params.article_id)
    .then(([article]) => {
        if (article) {
            deleteArticle(req.params.article_id)
            .then(() => res.status(204).send());
        } else Promise.reject({ code: 404, msg: `Resource Not Found: there are no articles with an id of "${req.params.article_id}".` }).catch(next);
    }).catch(next);
};

module.exports = { sendArticles, sendArticleByID, sendCommentsByArticleID, sendUpdatedArticle, sendPostedComment, sendAddedArticle, confirmDeletedArticle };
