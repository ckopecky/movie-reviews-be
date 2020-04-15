const faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('moviereviews').del()
      .then(() => {
        // Inserts seed entries
        let moviereviews = [];
        let movieIds = [8587, 5156, 992, 278, 238, 424, 372058, 496243, 129, 680, 637, 13, 122, 769, 389, 346, 510,508439, 446893, 522212, 571265, 419704, 619264, 181812, 512200, 408647, 102899, 571, 11113, 11, 762, 408, 601, 8810, 812, 10693, 329, 770 ]
        for(let i = 0; i <= 100; i++) {
          let movieId = movieIds[Math.floor(Math.random() * movieIds.length)];
          let userId = 1;
          let reviewer = 'kopecky12112@gmail.com';
          let textBody = faker.lorem.paragraph(7);
          let rating = faker.random.number({min: 1, max: 5});
          moviereviews.push({movieId, userId, reviewer, textBody, rating});
        }
        return knex('moviereviews').insert(moviereviews);
      });
};
