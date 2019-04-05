const { updateComment, deleteComment } = require('../models/comments');

function sendUpdatedComment (req, res, next) {
    updateComment({ ...req.params, ...req.body })
    .then(comment => {
        comment = comment[0];
        res.status(200).send(comment);
    })
    .catch(next);
};

function confirmDeletedComment (req, res, next) {
    deleteComment(req.params)
    .then(() => {
        res.status(204).send();
    })
    .catch(next);
};

module.exports = { sendUpdatedComment, confirmDeletedComment };