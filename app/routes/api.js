const { usersRouter, topicsRouter, articlesRouter, commentsRouter } = require('./index');

const apiRouter = require('express').Router();

apiRouter.route('/')
.get((req, res, next) => {
    res.status(200).send('How to use my API...')})
.all((req, res, next) => Promise.reject({code: 405}).catch(next));

apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;