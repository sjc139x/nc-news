const { usersRouter, topicsRouter, articlesRouter, commentsRouter } = require('./index');

const apiRouter = require('express').Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;