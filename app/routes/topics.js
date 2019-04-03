//must require in controllers here

const topicsRouter = require('express').Router();

topicsRouter.get('/', (req, res) => {
    res.send('Topics router...');
});

module.exports = topicsRouter;