const connection = require('../../db/connection');

function updateComment ({ comment_id, inc_votes }) {
    return connection('comments')
    .where('comment_id', comment_id)
    .increment('votes', inc_votes)
    .returning('*')
};

function deleteComment({ comment_id }) {
    return connection('comments')
    .where('comment_id', comment_id)
    .del('*')
};

module.exports = { updateComment, deleteComment };