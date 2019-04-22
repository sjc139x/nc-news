const connection = require('../../db/connection');

function updateComment ({ comment_id, inc_votes }) {
    return connection('comments')
    .where('comment_id', comment_id)
    .increment('votes', inc_votes || 0)
    .returning('*')
};

function deleteComment({ comment_id }) {
    return connection('comments')
    .where('comment_id', comment_id)
    .del('*')
};

function checkComment (comment_id) {
    return connection
    .select('comment_id')
    .from('comments')
    .where('comment_id', comment_id)
    .then((res) => {
        return res;
    });
};

module.exports = { updateComment, deleteComment, checkComment };