
exports.up = function(knex, Promise) {
  console.log('Creating articles table...');
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id');
    articlesTable.string('title').notNullable();
    articlesTable.text('body').notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic');
    articlesTable.foreign('topic').references('slug').inTable('topics');
    articlesTable.string('author');
    articlesTable.foreign('author').references('username').inTable('users');
    //NOT SURE ABOUT BELOW - NEED TO CHANGE TO DATE?
    articlesTable.date('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  console.log('Removing articles table...');
  return knex.schema.dropTable('articles');
};
