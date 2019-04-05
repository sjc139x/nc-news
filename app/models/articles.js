const connection = require('../../db/connection');

function fetchArticles ({ author, topic, sort_by, order }) {
    return connection
    .select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.comment_id as comment_count')
    .orderBy(sort_by || 'created_at', order || 'desc')
    .modify(query => {
        if (author) query.where({ 'articles.author': author });
        if (topic) query.where({ topic });
    });
};

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
    .increment('votes', inc_votes || 0)
    .returning('*')
};

function postComment ([ article_id, comment ]) {
    return connection
    .insert({ author: comment.username, article_id: article_id.article_id, body: comment.body })
    .into('comments')
    .returning('*')
};

module.exports = { fetchArticles, fetchArticleByID, fetchCommentsByArticleID, updateArticle, postComment };
