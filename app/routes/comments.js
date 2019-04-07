const { sendUpdatedComment, confirmDeletedComment } = require('../controllers/comments');

const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id').patch(sendUpdatedComment).delete(confirmDeletedComment).all((req, res, next) => Promise.reject({code: 405}).catch(next));

module.exports = commentsRouter;