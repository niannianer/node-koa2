exports.up = function (knex, Promise) {
    const p1 = knex.schema.createTable('users', users => {
        users.uuid('user_id').notNullable().primary(); //userid
        users.string('mobile').unique().notNullable();
        users.string('user_name').nullable();
        users.string('password').notNullable();
        users.timestamp('created_at').defaultTo(knex.fn.now());
        users.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    const p2 = knex.schema.createTable('logs', logs => {
        logs.increments('id').primary();
        logs.string('user_id').notNullable();
        logs.string('type');
        logs.timestamp('created_at').defaultTo(knex.fn.now());

    });
    return Promise.all([p1, p2]);
};

exports.down = function (knex, Promise) {
    const p1 = knex.schema.dropTable('users');
    const p2 = knex.schema.dropTable('logs');
    return Promise.all([p1, p2]);
};
