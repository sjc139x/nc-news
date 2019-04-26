const { usersRouter, topicsRouter, articlesRouter, commentsRouter } = require('./index');

const apiRouter = require('express').Router();

apiRouter.route('/')
.get((req, res, next) => {
    res.status(200).json({
        'T O P I C S': {
            '(GET) /API/TOPICS': {
                response_if_successful: "array of topics in the database"
            },
            '(POST) /API/TOPICS': {
                request_body_format: { slug: "topic-not-in-db", description: "helpful-description (optional)" },
                response_if_successful: "new topic"
            }
        },
        'A R T I C L E S': {
            '(GET) /API/ARTICLES': {
                available_queries: {
                    author: "filters articles by username",
                    topic: "filters articles by topic",
                    sort_by: "sorts articles by any valid column (default of created_at)",
                    order: "order of sort (default of desc)"
                },
                response_if_sucessful: "array of articles in the database (no body)"
            },
            '(GET) /API/ARTICLES/:ARTICLE_ID': {
                response_if_successful: "specific article"
            },
            '(GET) /API/ARTICLES/:ARTICLE_ID/COMMENTS': {
                available_queries: {
                    sort_by: "sorts comments by any valid column (default of created_at)",
                    order: "order of sort (default of desc)"
                },
                response_if_successful: "comments for specific article"
            },
            '(POST) /API/ARTICLES': {
                request_body_format: { title: "article-title", body: "article-content", author: "existing-user", topic: "existing-topic" },
                response_if_successful: "new article"
            },
            '(POST) /API/ARTICLES/:ARTICLE_ID/COMMENTS': {
                request_body_format: { username: "existing-user", body: "actual-comment" },
                response_if_successful: "new comment"
            },
            '(PATCH) /API/ARTICLES/:ARTICLE_ID': {
                request_body_format: { inc_votes: "integer" },
                response_if_successful: "updated article"
            },
            '(DELETE) /API/ARTICLES/:ARTICLE_ID': {
                response_if_successful: "no body (204)"
            }
        },
        'C O M M E N T S': {
            '(PATCH) /API/COMMENTS/:COMMENT_ID': {
                request_body_format: { inc_votes: "integer" },
                response_if_successful: "updated comment"
            },
            '(DELETE) /API/COMMENTS/:COMMENT_ID': {
                response_if_successful: "no body (204)"
            }
        },
        'U S E R S': {
            'GET /API/USERS': {
                response_if_successful: "array of users in the database (no name value)"
            },
            '(GET) /API/USERS/:USERNAME': {
                response_if_successful: "specific user information"
            },
            'POST /API/USERS': {
                request_body_format: { username: "username-not-in-db", name: "name (optional)", avatar_url: "picture link (optional)" },
                response_if_successful: "new user"
            }
        }
    })})
.all((req, res, next) => Promise.reject({ code: 405, msg: 'Method Not Allowed: only GET methods are allowed on this route (/api).' }).catch(next));

apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;