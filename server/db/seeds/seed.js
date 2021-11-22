const { encryptPassword } = require('../../utils/crypto');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  const teacherPassword = await encryptPassword('Password1');
  const studentPassword = await encryptPassword('Password1');

  // Inserts seed entries
  await knex('users').insert([
    {
      user_name: 'Teacher',
      user_email: 'teacher@web.com',
      user_is_teacher: true,
      user_password: teacherPassword,
    },
    {
      user_name: 'Student',
      user_email: 'student@web.com',
      user_is_teacher: false,
      user_password: studentPassword,
    },
  ]);

  // Courses
  const CRYPTO_CLASS_DESC = 'Crypto in Node.js';
  const MATH_CLASS_DESC = 'Discrete Mathematics';
  const [{ user_id: teacherId }] = await knex('users')
    .select('user_id')
    .where({ user_is_teacher: true });

  await knex('courses').del();
  await knex('courses').insert([
    {
      user_id: teacherId,
      description: CRYPTO_CLASS_DESC,
    },
    {
      user_id: teacherId,
      description: MATH_CLASS_DESC,
    },
  ]);

  // create lessons
  await knex('lessons').del();
  const [{ course_id: cryptoCourseId }] = await knex('courses')
    .select('course_id')
    .where({ description: CRYPTO_CLASS_DESC });

  const LESSON_1 = {
    title: 'Hash',
    description: 'Learn what a hash is',
  };

  const LESSON_2 = {
    title: 'Salt',
    description: 'Learn what Salts are',
  };

  const LESSON_3 = {
    title: 'HMAC',
    description: 'Learn what HMAC is',
  };

  const CRYPTO_LESSONS = [LESSON_1, LESSON_2, LESSON_3];

  await knex('lessons').insert(
    CRYPTO_LESSONS.map((lesson) => ({ ...lesson, course_id: cryptoCourseId })),
  );

  // enroll students
  const [{ user_id: student_id }] = await knex('users')
    .select('user_id')
    .where({ user_is_teacher: false });

  await knex('enrollments').del();
  await knex('enrollments').insert([
    {
      student_id,
      course_id: cryptoCourseId,
    },
  ]);

  // create cards
  const [{ lesson_id: lessonOneId }] = await knex('lessons').where({
    course_id: cryptoCourseId,
  });

  const LESSON_ONE_CARDS = [
    {
      card_id: 1,
      front:
        'What is a Hash? The etyomology of the word hash has culinary roots, meaning to "chop & mix".',
    },
    {
      card_id: 2,
      prev_card_id: 1,
      front:
        'This is still fairly accurate. You take an input of a variable length, and then pass it off to a hashing algorithm, and it returns a fixed length value of what looks like meaningless garbage.',
    },
    {
      card_id: 3,
      prev_card_id: 2,
      front:
        'The important things to keep in mind is that a hashing function, given the same input, will always produce the same output. It needs to be fast to run a hashing function, and **infeasible** to reverse-engineer what the original message was.',
    },
    {
      card_id: 4,
      prev_card_id: 3,
      front:
        'This is useful because it allows developers to store data without having to know what that data is. A common example is storing passwords in a database. ',
    },
    {
      card_id: 5,
      is_question_card: true,
      front: 'What what kind of output does a hash function produce?',
      back: 'Given input of variable length, a hash function produces output of fixed length.',
      prev_card_id: 4,
    },
  ];

  await knex('cards').insert(
    LESSON_ONE_CARDS.map((uniqFields) => ({
      ...uniqFields,
      lesson_id: lessonOneId,
    })),
  );

  await knex.raw("SELECT setval('cards_card_id_seq', max(card_id)) from cards");
};
