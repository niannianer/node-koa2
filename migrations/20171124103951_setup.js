exports.up = async function (knex, Promise) {
    await knex.schema.createTable('users', users => {
        users.increments('id').primary();
        users.string('uuid').unique().notNullable(); //userid
        users.string('mobile').unique().notNullable();
        users.string('user_name').nullable();
        users.string('password').notNullable();
        users.timestamp('created_at').defaultTo(knex.fn.now());
        users.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    await knex.schema.createTable('logs', logs => {
        logs.increments('id').primary();
        logs.string('user_id').notNullable();
        logs.foreign('user_id').references('uuid').inTable('users');
        logs.string('type');
        logs.timestamp('created_at').defaultTo(knex.fn.now());

    });


};

exports.down = async function (knex, Promise) {
    await knex.schema.dropTable('logs');
    await knex.schema.dropTable('users');

};
