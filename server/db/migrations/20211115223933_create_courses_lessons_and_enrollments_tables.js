exports.up = async function (knex) {
  await knex.schema.createTable('courses', (t) => {
    t.increments('course_id').primary();
    t.string('description', 255).notNullable();
    t.uuid('user_id');
    t.foreign('user_id').references('user_id').inTable('users');
    t.timestamps(true, true);
  });

  await knex.schema.createTable('lessons', (t) => {
    t.increments('lesson_id');
    t.integer('course_id');
    t.foreign('course_id').references('course_id').inTable('courses');
    t.string('title', 255).notNullable();
    t.string('description', 255).notNullable();
    t.timestamps(true, true);
  });

  await knex.schema.createTable('enrollments', (t) => {
    t.increments('enrollment_id').notNullable();
    t.integer('course_id');
    t.foreign('course_id').references('course_id').inTable('courses');
    t.uuid('student_id');
    t.foreign('student_id').references('user_id').inTable('users');
    t.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('enrollments')
    .dropTable('lessons')
    .dropTable('courses');
};
