const sendUpdatedComment = require('../controllers/comments');

const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id').patch(sendUpdatedComment);

module.exports = commentsRouter;