exports.up = async function (knex) {
  await knex.schema.createTable('courses', (t) => {
    t.increments('course_id').primary();
    t.string('description', 255).notNullable();
    t.uuid('user_id');
    t.foreign('user_id').references('users.user_id');
    t.timestamps();
  });

  await knex.schema.createTable('lessons', (t) => {
    t.increments('lesson_id');
    t.integer('course_id');
    t.foreign('course_id').references('courses.course_id');
    t.string('title', 255).notNullable();
    t.string('description', 255).notNullable();
  });

  await knex.schema.createTable('enrollments', (t) => {
    t.increments('enrollment_id').notNullable();
    t.integer('course_id');
    t.foreign('course_id').references('courses.course_id');
    t.uuid('user_id');
    t.foreign('user_id').references('users.user_id');
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('enrollments')
    .dropTable('lessons')
    .dropTable('courses');
};
