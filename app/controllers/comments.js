const { updateComment, deleteComment, checkComment } = require('../models/comments');
const { checkVotesBodyFormat } = require('../../utils/utilFuncs');

function sendUpdatedComment (req, res, next) {
    if (checkVotesBodyFormat(req.body)) {
        checkComment(req.params.comment_id)
        .then(([comment_id]) => {
            if (comment_id) {
                updateComment({ ...req.params, ...req.body })
                .then(([comment]) => res.status(200).send({ comment }));
            } else Promise.reject({code: 404}).catch(next);
        });
    } else Promise.reject({code: 400}).catch(next);
};

function confirmDeletedComment (req, res, next) {
    checkComment(req.params.comment_id)
    .then(([comment_id]) => {
        if (comment_id) {
            deleteComment(req.params)
            .then(() => res.status(204).send());
        } else Promise.reject({code: 404}).catch(next);
    });  
};

module.exports = { sendUpdatedComment, confirmDeletedComment };