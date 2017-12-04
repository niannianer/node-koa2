exports.up = async function (knex, Promise) {
    await knex.schema.createTable('users', users => {
        users.string('id').primary();
        users.string('mobile').unique().notNullable();
        users.string('user_name').nullable();
        users.string('password').notNullable();
        users.timestamp('created_at').defaultTo(knex.fn.now());
        users.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    await knex.schema.createTable('logs', logs => {
        logs.increments('id').primary();
        logs.string('user_id').notNullable();
        logs.foreign('user_id').references('id').inTable('users');
        logs.string('type');
        logs.timestamp('created_at').defaultTo(knex.fn.now());

    });


};

exports.down = async function (knex, Promise) {
    await knex.schema.dropTable('logs');
    await knex.schema.dropTable('users');

};
