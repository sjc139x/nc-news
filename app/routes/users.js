const { sendUsers, sendUserByID, sendAddedUser } = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.route('/').get(sendUsers).post(sendAddedUser).all((req, res, next) => Promise.reject({code: 405}).catch(next));
usersRouter.route('/:username').get(sendUserByID).all((req, res, next) => Promise.reject({code: 405}).catch(next));

module.exports = usersRouter;
