const sendUserByID = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.route('/:username').get(sendUserByID);

module.exports = usersRouter;
