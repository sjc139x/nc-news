//must require in controllers here

const commentsRouter = require('express').Router();

commentsRouter.get('/', (req, res) => {
    res.send('Comments router...');
});

module.exports = commentsRouter;