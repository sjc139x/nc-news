const { userData, topicData, articleData, commentData } = require('../data');

exports.seed = function(knex, Promise) {
  return knex.migrate.rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex('users').insert(userData).returning('*'))
  .then(() => knex('topics').insert(topicData).returning('*'))
  .then(() => knex('articles').insert(articleData).returning('*'))
  .then(() => console.log('dis one gon go 2 shit'));
};



// exports.seed = function(knex, Promise) {
//     return knex.migrate
//       .rollback()
//       .then(() => knex.migrate.latest())
//       .then(() =>  knex('houses').insert(houseData).returning('*'))
//       .then(houseRows => {
//         const houseRef = createRef(houseRows, 'house_name', 'house_id');
//         const formattedWizards = formatWizards(wizardData, houseRef);
//         const wizardInsertions = knex('wizards')
//           .insert(formattedWizards)
//           .returning('*');
//         return Promise.all([houseRows, wizardInsertions]);
//       });
//   };