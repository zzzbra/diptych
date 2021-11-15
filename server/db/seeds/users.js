const { encryptPassword } = require('../../utils/crypto');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async () => {
      const teacherPassword = await encryptPassword('Password1');
      const studentPassword = await encryptPassword('Password1');

      return { teacherPassword, studentPassword };
    })
    .then(function ({ teacherPassword, studentPassword }) {
      console.log(teacherPassword, studentPassword);
      // Inserts seed entries
      return knex('users').insert([
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
    });
};
