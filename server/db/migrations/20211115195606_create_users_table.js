exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id');
    table.string('user_name', 255).notNullable();
    table.string('user_email', 255).notNullable();
    table.string('user_password', 255).notNullable();
    table.boolean('user_is_teacher', false).notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
