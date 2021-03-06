const connection = require("../../db/connection");

function fetchArticles({ author, topic, sort_by, order, limit, p }) {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes",
      "articles.image"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    })
    .limit(limit || 10)
    .offset(limit * (p - 1) || 10 * (p - 1) || 0);
}

function fetchArticleByID({ article_id }) {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.body",
      "articles.topic",
      "articles.created_at",
      "articles.votes",
      "articles.image"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .modify(query => {
      if (article_id) query.where({ "articles.article_id": article_id });
    });
}

function fetchArticlesWithoutLimit({ author, topic, sort_by, order }) {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes",
      "articles.image"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    });
}

function fetchCommentsByArticleID({ article_id, sort_by, order, limit, p }) {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body", "article_id")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .limit(limit || 10)
    .offset(limit * (p - 1) || 10 * (p - 1) || 0);
}

function updateArticle({ article_id, inc_votes }) {
  return connection("articles")
    .where("article_id", article_id)
    .increment("votes", inc_votes || 0)
    .returning("*");
}

function postComment([article_id, comment]) {
  return connection
    .insert({
      author: comment.username,
      article_id: article_id.article_id,
      body: comment.body
    })
    .into("comments")
    .returning("*");
}

function checkArticle(article_id) {
  return connection
    .select("article_id")
    .from("articles")
    .where("article_id", article_id)
    .then(res => {
      return res;
    });
}

function addArticle(articleInfo) {
  return connection
    .insert({
      title: articleInfo.title,
      body: articleInfo.body,
      author: articleInfo.author,
      topic: articleInfo.topic
    })
    .into("articles")
    .returning("*");
}

function deleteArticle(article_id) {
  return connection("articles")
    .where("article_id", article_id)
    .del("*");
}

module.exports = {
  fetchArticles,
  fetchArticleByID,
  fetchCommentsByArticleID,
  updateArticle,
  postComment,
  checkArticle,
  addArticle,
  deleteArticle,
  fetchArticlesWithoutLimit
};
