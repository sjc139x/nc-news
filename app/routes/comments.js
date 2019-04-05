const { sendUpdatedComment, confirmDeletedComment } = require('../controllers/comments');

const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id').patch(sendUpdatedComment).delete(confirmDeletedComment);

module.exports = commentsRouter;