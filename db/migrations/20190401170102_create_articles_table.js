exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id");
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic");
    articlesTable
      .foreign("topic")
      .references("slug")
      .inTable("topics")
      .onDelete("CASCADE");
    articlesTable.string("author");
    articlesTable
      .foreign("author")
      .references("username")
      .inTable("users")
      .onDelete("CASCADE");
    articlesTable.datetime("created_at").defaultTo(knex.fn.now());
    articlesTable.string("image");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
