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
    .select('article_id', 'author', 'title', 'body', 'topic', 'created_at', 'votes')
    .from('articles')
    .modify(query => {
        if (article_id) query.where({ article_id });
    });
};

function fetchCommentsByArticleID({ article_id, sort_by, order }) {
    return connection
    .select('comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where('article_id', article_id)
    .orderBy(sort_by || 'created_at', order || 'desc')
};

function updateArticle ({ article_id, inc_votes }) {
    return connection('articles')
    .where('article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*')
};

module.exports = { fetchArticles, fetchArticleByID, fetchCommentsByArticleID, updateArticle };
