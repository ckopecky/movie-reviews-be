
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users
            .increments('id')
        users
            .string('twitterId', 25)
            .unique()
        users
            .string('googleId', 50)
            .unique()
        users
            .string('stripeId', 50)
            .unique()
        users
            .string('username', 50)
            .unique()
        users
            .string('name', 100)
        users
            .string('email', 254)
            .unique()
        users
            .boolean('premium_user')
            .defaultTo(false)
        users
            .string('photo', 200)
        users
            .timestamp('created_at')
            .defaultTo(knex.fn.now())
        users
            .timestamp('updated_at')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
