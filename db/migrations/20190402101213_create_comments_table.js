
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id');
    commentsTable.string('author');
    commentsTable.foreign('author').references('username').inTable('users').onDelete('CASCADE');
    commentsTable.integer('article_id');
    commentsTable.foreign('article_id').references('article_id').inTable('articles').onDelete('CASCADE');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at').defaultTo(knex.fn.now());
    commentsTable.text('body').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
