exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('users', (t) => {
    t.uuid('user_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('user_name', 255).notNullable();
    t.string('user_email', 255).notNullable();
    t.string('user_password', 255).notNullable();
    t.boolean('user_is_teacher', false).notNullable();
    t.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
