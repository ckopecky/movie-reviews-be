
exports.up = function(knex, Promise) {
    return knex.schema.createTable('moviereviews', moviereviews => {
        moviereviews.increments('id');
        moviereviews
            .integer('movieId')
            .notNullable();
        moviereviews
            .integer('userId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('cascade')
            .index();
        moviereviews
            .string('reviewer')
            .notNullable()
            .references('email')
            .inTable('users')
            .onDelete('cascade')
        moviereviews
            .text('textBody', 5000)
            .notNullable()
        moviereviews
            .integer('rating')
        moviereviews
            .timestamp('created_at')
            .defaultTo(knex.fn.now())
        moviereviews
            .timestamp('updated_at')
            .defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('moviereviews');
};
