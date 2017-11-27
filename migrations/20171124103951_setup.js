exports.up = function (knex, Promise) {
    const p1 = knex.schema.createTable('users', users => {
        users.increments('id').primary();
        users.uuid('uuid').unique().notNullable(); //userid
        users.string('mobile').unique().notNullable();
        users.string('user_name').nullable();
        users.string('password').notNullable();
        users.timestamp('created_at').defaultTo(knex.fn.now());
        users.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    const p2 = knex.schema.createTable('logs', logs => {
        logs.increments('id').primary();
        logs.string('user_id').notNullable().references('uuid').inTable('users');
        logs.string('type');
        logs.timestamp('created_at').defaultTo(knex.fn.now());

    });
    return p1.then(() => {
        return p2;
    });
};

exports.down = function (knex, Promise) {
    const p1 = knex.schema.dropTable('users');
    const p2 = knex.schema.dropTable('logs');
    return p2.then(() => {
        return p1;
    });
};
