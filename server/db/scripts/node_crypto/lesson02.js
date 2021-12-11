module.exports = [
  {
    card_id: 2000,
    front:
      'Hashes are great for making passwords unreadable, but because they always produce the same output, they are not very secure.',
  },
  {
    card_id: 2001,
    prev_card_id: 2000,
    front:
      'Users often to use weak passwords, like “password123”. When a database is compromised, the attacker can easily find the value of a hash by searching a rainbow table of common hashes.',
  },
  {
    card_id: 2002,
    prev_card_id: 2001,
    front:
      'A rainbow table is just a giant list of passwords and what their hash output would look like. This makes reverse engineering a password (or other sensitive information) from a leaked hash value unnecessary.',
  },
  {
    card_id: 2003,
    prev_card_id: 2002,
    front:
      'So what can we do to add a greeater obscurity to our sensitive information? The answer is something called a "salt".',
  },
  {
    card_id: 2004,
    prev_card_id: 2003,
    front:
      'A salt is a random string that is added to the input before hashing. This makes the hash more unique and harder to guess.',
  },
  {
    card_id: 2005,
    is_question_card: true,
    front:
      'What is the name of the resource that hackers use to avoid needing to reverse engineer a hash?',
    back: 'A rainbow table -- but they need access to the stored hash outputs of the data they are after.',
    prev_card_id: 2004,
  },
];
