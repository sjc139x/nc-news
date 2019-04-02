const { userData, topicData, articleData, commentData } = require('../data');
const { formatArticleData, formatCommentData } = require('../../utils/utilFuncs');

exports.seed = function(knex, Promise) {
  return knex.migrate.rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex('users').insert(userData).returning('*'))
  .then(() => knex('topics').insert(topicData).returning('*'))
  .then(() => knex('articles').insert(formatArticleData(articleData)).returning('*'))
  .then((articleSQLdata) => console.log(articleSQLdata))
  .then(() => knex('comments').insert(commentData).returning('*'))
};

// error: column "belongs_to" of relation "comments" does not exist