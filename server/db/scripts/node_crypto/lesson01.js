module.exports = [
  {
    card_id: 1,
    front:
      'What is a Hash? The etyomology of the word hash has culinary roots, meaning to "chop & mix".',
  },
  {
    card_id: 2,
    prev_card_id: 1,
    front:
      'This is still fairly accurate in light of what a hashing function does. You take an input of a variable length, and then pass it off to a hashing algorithm, and it returns a fixed length value of what looks like meaningless garbage.',
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
    card_id: 66666,
    prev_card_id: 4,
    front:
      'This is useful because it allows developers to store data without having to know what that data is. A common example is storing passwords in a database. ',
  },
  {
    card_id: 5,
    front:
      'Hash functions do have some limitations however; there is not a 100% guarantee that the output of a hash function will not coincidentally match the output of that hash given a completely different input. However the changes of this are very slim.',
    prev_card_id: 66666,
  },
  {
    card_id: 6,
    is_question_card: true,
    front: 'When given the same output, a hashing function will produce...',
    back: 'the same output. Always.',
    prev_card_id: 5,
  },
  {
    card_id: 7,
    is_question_card: true,
    front:
      'What characteristics of a hashing function make it a useful cryptographic mechanism?',
    back: "It is fast to compute, but computationally expensive to find the original input. This means that the output of a hashing function is a secure store of that data. We don't care as much who can see it because it isn't quick and easy to reverse it and figure out what the source is.",
    prev_card_id: 6,
  },
  {
    card_id: 8,
    is_question_card: true,
    front:
      'What is one possible but unlikely issue found in hashing functions?',
    back: "There is the smallest probability that two separate inputs yield the same hash -- what is known as a 'collision'.",
    prev_card_id: 7,
  },
];
