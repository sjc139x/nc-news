const { updateComment, deleteComment } = require('../models/comments');

function sendUpdatedComment (req, res, next) {
    updateComment({ ...req.params, ...req.body })
    .then(([comment]) => {
        res.status(200).send({ comment });
    })
    .catch(next);
};

//can delete send from below?
function confirmDeletedComment (req, res, next) {
    deleteComment(req.params)
    .then(() => {
        res.status(204).send();
    })
    .catch(next);
};

module.exports = { sendUpdatedComment, confirmDeletedComment };