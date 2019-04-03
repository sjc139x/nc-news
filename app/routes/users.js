//must require in controllers here

const usersRouter = require('express').Router();

usersRouter.get('/', (req, res) => {
    res.send('Users router...');
});

module.exports = usersRouter;
