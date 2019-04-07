const sendUserByID = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.route('/:username').get(sendUserByID).all((req, res, next) => Promise.reject({code: 405}).catch(next));

module.exports = usersRouter;
