
exports.up = function(knex, Promise) {
    return knex.schema.createTable('movieReviews', movieReviews => {
        movieReviews.increments('id');
        movieReviews
            .integer('movieId')
            .notNullable();
        movieReviews
            .integer('userId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('cascade')
            .index();
        movieReviews
            .string('reviewer')
            .notNullable()
            .references('email')
            .inTable('users')
            .onDelete('cascade')
            .index()
        movieReviews
            .text('textBody', 5000)
            .notNullable()
        movieReviews
            .integer('rating')
        movieReviews
            .timestamp('created_at')
            .defaultTo(knex.fn.now())
        movieReviews
            .timestamp('updated_at')
            .defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movieReviews');
};
