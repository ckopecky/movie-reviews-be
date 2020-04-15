const faker = require('faker')

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      let users = [{googleId: '108487946027926573896', twitterId: null, stripeId: 'cus_H65SRS6Bi9oAdi', username: 'kopecky12112@gmail.com', name: 'Christina Kopecky', email: 'kopecky12112@gmail.com', premium_user: 1, photo: 'https://lh5.googleusercontent.com/-0I-5ybxkgMM/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJN4KFRuVTzLp8sQcNIjtvbJVb8aAg/photo.jpg'}];
      return knex('users').insert(users);
    })
};
