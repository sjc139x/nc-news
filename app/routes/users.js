const { sendUsers, sendUserByID, sendAddedUser } = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.route('/').get(sendUsers).post(sendAddedUser).all((req, res, next) => Promise.reject({ code: 405, msg: 'Method Not Allowed: only GET and POST methods are allowed on this route (/api/users).' }).catch(next));
usersRouter.route('/:username').get(sendUserByID).all((req, res, next) => Promise.reject({ code: 405, msg: 'Method Not Allowed: only GET methods are allowed on this route (/api/users/:username).' }).catch(next));

module.exports = usersRouter;
