const faker = require('faker')

let bools = [ true, false ];
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      let users = [];
      for(let i = 0; i <= 50; i++) {
        let twitterId = faker.random.uuid()
        let googleId = faker.random.uuid();
        let stripeId = faker.random.uuid();
        let username = faker.internet.userName();
        let name = faker.name.firstName() + " " + faker.name.lastName();
        let email = faker.internet.email();
        let premium_user = Math.floor(Math.random() * bools.length);
        let photo = faker.internet.url();
        users.push({ googleId, twitterId, stripeId, username, name, email, premium_user, photo})
      }
      return knex('users').insert(users);
    });
};
