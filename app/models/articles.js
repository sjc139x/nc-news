const connection = require('../../db/connection');

function fetchArticles ({ author, topic, sort_by, order }) {
    return connection
    .select('author', 'title', 'article_id', 'topic', 'created_at', 'votes')
    .from('articles')
    .orderBy(sort_by || 'created_at', order || 'desc')
    .modify(query => {
        if (author) query.where({ author });
        if (topic) query.where({ topic });
    });
};

//do we need below? not very dry...
function fetchArticleByID ({ article_id }) {
    return connection
    .select('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes')
    .from('articles')
    .modify(query => {
        if (article_id) query.where({ article_id });
    });
};

function fetchCommentsByArticleID({ article_id }) {
    return connection
    .select('article_id', 'comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where('article_id', article_id)
};

module.exports = { fetchArticles, fetchArticleByID, fetchCommentsByArticleID };
