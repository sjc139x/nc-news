const { updateComment, deleteComment, checkComment } = require('../models/comments');
const { checkVotesBodyFormat } = require('../../utils/utilFuncs');

function sendUpdatedComment (req, res, next) {
    if (checkVotesBodyFormat(req.body)) {
        checkComment(req.params.comment_id)
        .then(([comment_id]) => {
            if (comment_id) {
                updateComment({ ...req.params, ...req.body })
                .then(([comment]) => res.status(200).send({ comment }));
            } else Promise.reject({ code: 404, msg: `Resource Not Found: comment cannot be updated because "${req.params.comment_id}" is not a valid comment_id.` }).catch(next);
        }).catch(next);
    } else Promise.reject({ code: 400, msg: `Bad Request: "${req.body.inc_votes}" is not a valid value for inc_votes (must be an integer).` }).catch(next);
};

function confirmDeletedComment (req, res, next) {
    checkComment(req.params.comment_id)
    .then(([comment_id]) => {
        if (comment_id) {
            deleteComment(req.params)
            .then(() => res.status(204).send());
        } else Promise.reject({ code: 404, msg: `Resource Not Found: comment cannot be deleted because "${req.params.comment_id}" is not a valid comment_id.` }).catch(next);
    }).catch(next);
};

module.exports = { sendUpdatedComment, confirmDeletedComment };