const { genSalt, hash } = require('bcrypt');

const encryptPassword = async (password) => {
  console.log('Begin try encrypting password...');
  try {
    const saltRound = 10;
    const salt = await genSalt(saltRound);
    const encryptedPassword = await hash(password, salt);

    console.log('Password successfully encrypted');
    return encryptedPassword;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  encryptPassword,
};
