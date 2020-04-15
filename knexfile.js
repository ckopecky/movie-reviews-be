require('dotenv').config();



module.exports  = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './src/data/moviereview.db'
        },
        useNullAsDefault: true,
        migrations: { 
            directory: './src/data/migrations/development' 
        },
        seeds: { 
            directory: './src/data/seeds/development' 
        }
    },
    
    production: {
        client: 'pg', 
        connection: process.env.DATABASE_URL,
        useNullAsDefault: true,
            pool: {
                afterCreate: function (conn, cb) {
                    conn.run('PRAGMA foreign_keys = ON', cb)
                  }
            },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/data/migrations/development'
        },
        seeds: {
            tableName: 'knex_seeds',
            directory: './src/data/seeds/development'
        }

    }
};