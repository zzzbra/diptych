const { encryptPassword } = require('../../utils/crypto');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  const teacherPassword = await encryptPassword('Password1');
  const studentPassword = await encryptPassword('Password1');

  // Inserts seed entries
  await knex('users').insert([
    {
      user_name: 'Mariko',
      user_email: 'mariko@gmail.com',
      user_is_teacher: true,
      // TODO: use pgcrypto to create encrypted password
      user_password: teacherPassword,
    },
    {
      user_name: 'Zach',
      user_email: 'zach@gmail.com',
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
};
