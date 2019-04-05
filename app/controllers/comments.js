const updateComment = require('../models/comments');

function sendUpdatedComment (req, res, next) {
    updateComment({ ...req.params, ...req.body })
    .then(comment => {
        res.status(200).send({ comment });
    })
};

module.exports = sendUpdatedComment;