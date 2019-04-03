//must require in controllers here

const articlesRouter = require('express').Router();

articlesRouter.get('/', (req, res) => {
    res.send('Articles router...');
});

module.exports = articlesRouter;