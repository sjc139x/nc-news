const { sendUpdatedComment, confirmDeletedComment } = require('../controllers/comments');

const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id').patch(sendUpdatedComment).delete(confirmDeletedComment).all((req, res, next) => Promise.reject({ code: 405, msg: 'Method Not Allowed: only PATCH and DELETE methods are allowed on this route (/api/comments/:comment_id).' }).catch(next));

module.exports = commentsRouter;