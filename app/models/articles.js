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
}

module.exports = fetchArticles;

// comment_count which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this

// function fetchTreasures({ limit, sort_by, order, colour, max_age, min_age, max_price, min_price }) {
//   return connection
//   .select('treasure_id', 'treasure_name', 'colour', 'age', 'shop_name')
//   .from('treasures')
//   .join('shops', 'treasures.shop_id', 'shops.shop_id')
//   .orderBy(sort_by || 'cost_at_auction', order)
//   .limit(limit || 25)
//   .modify(query => {
//     if (colour) query.where({ colour });
//     if (max_age) query.where('age', '<', max_age);
//     if (min_age) query.where('age', '>', min_age);
//     if (max_price) query.select('cost_at_auction').where('cost_at_auction', '<', max_price);
//     if (min_price) query.select('cost_at_auction').where('cost_at_auction', '>', min_price);
//   });
// }