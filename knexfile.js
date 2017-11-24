// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: '47.93.42.46',
            user: 'zjht_admin',
            password: 'zjhttest',
            database: 'kingold_koa_dev',
            charset: 'utf8'
        }
    },

    test: {
        client: 'mysql',
        connection: {
            host: '47.93.42.46',
            user: 'zjht_admin',
            password: 'zjhttest',
            database: 'kingold_koa_test',
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: '47.93.42.46',
            user: 'zjht_admin',
            password: 'zjhttest',
            database: 'kingold_koa',
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
