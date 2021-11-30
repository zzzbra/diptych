exports.up = async function (knex) {
  await knex.schema.createTable('courses', (t) => {
    t.increments('course_id').primary();
    t.string('description', 255).notNullable();
    t.uuid('user_id');
    t.foreign('user_id').references('user_id').inTable('users');
    t.timestamps(true, true);
  });

  await knex.schema.createTable('lessons', (t) => {
    t.increments('lesson_id').primary();
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

  await knex.schema.createTable('cards', (t) => {
    t.increments('card_id').primary();
    t.integer('prev_card_id');
    t.foreign('prev_card_id');
    t.integer('lesson_id');
    t.foreign('lesson_id').references('lesson_id').inTable('lessons');
    t.boolean('is_question_card').defaultTo(false);
    t.string('front').notNullable();
    t.string('back');
    t.timestamps(true, true);
  });

  await knex.schema.createTable('reviews', (t) => {
    t.increments('review_id').notNullable();
    t.uuid('student_id');
    t.foreign('student_id').references('user_id').inTable('users');
    t.integer('card_id');
    t.foreign('card_id').references('card_id').inTable('cards');
    t.integer('lesson_id');
    t.foreign('lesson_id').references('lesson_id').inTable('lessons');
    t.integer('rating').defaultTo(0);
    t.timestamp('due_date');
    t.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('reviews')
    .dropTable('cards')
    .dropTable('enrollments')
    .dropTable('lessons')
    .dropTable('courses');
};
