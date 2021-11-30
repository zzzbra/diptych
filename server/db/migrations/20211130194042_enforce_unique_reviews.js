exports.up = async function (knex) {
  await knex.schema.alterTable('reviews', (t) => {
    t.unique(['student_id', 'lesson_id', 'card_id']);
  });
};

exports.down = async function (knex) {};
