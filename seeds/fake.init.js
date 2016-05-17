var config = require('../config');
var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),
    knex('users').del(),
    knex('books').del(),
    knex('books_users').del(),
    knex('transactions').del(),

    // Inserts seed entries
    knex('users').insert({
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('admin', config.saltRounds),
      full_name: 'Admin',
      is_verified: true
    }),

    knex('users').insert({
      id: 2,
      username: 'john',
      password: bcrypt.hashSync('password', config.saltRounds),
      full_name: 'Big John',
      is_verified: true
    }),
// INITIAL SET OF BOOKS------------------------------------------------------------------------------------------------
    knex('books').insert({
      id: 1,
      title: 'Fundamentals of Database Systems (6th Edition)',
      author: 'Ramez Elmasri, Shamkant B. Navathe',
      isbn_13: '978-0136086208',
      image_url: 'http://ecx.images-amazon.com/images/I/41quNI7EQ-L._SX395_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 2,
      title: 'Essentials of Programming Languages (MIT Press)',
      author: 'Daniel P. Friedman, Mitchell Wand',
      isbn_13: '978-0262062794',
      image_url: 'http://ecx.images-amazon.com/images/I/41CDnVJTcKL._SX442_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 3,
      title: 'The Scheme Programming Language (MIT Press)',
      author: 'R. Kent Dybvig',
      isbn_13: '978-0262512985',
      image_url: 'http://ecx.images-amazon.com/images/I/51X%2B00UJjcL._SX387_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 4,
      title: 'Fundamentals of Probability, with Stochastic Processes (3rd Edition)',
      author: 'Saeed Ghahramani',
      isbn_13: '978-0131453401',
      image_url: 'http://ecx.images-amazon.com/images/I/51XAS9S6RVL._SX351_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 5,
      title: 'Big Java: Early Objects (5th Edition)',
      author:'Cay S. Horstmann',
      isbn_13:'978-1118431115',
      image_url:'http://ecx.images-amazon.com/images/I/516n1RkH7AL._SX398_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 6,
      title: 'Computer Organization and Design (5th Edition)',
      author: 'David A. Patterson, John L. Hennessy',
      isbn_13: '978-0124077263',
      image_url: 'http://ecx.images-amazon.com/images/I/51Td8wQuHbL._SX409_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 7,
      title: 'The Engineering Communication Manual (1st Edition)',
      author: 'Richard House, Richard Layton, Jessica Livingston, Sean Moseley',
      isbn_13: '978-0199339105',
      image_url: 'http://ecx.images-amazon.com/images/I/41CVhr1k-TL._SX399_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 8,
      title: 'Discrete and Combinatorial Mathematics: An Applied Introduction (5th Edition)',
      author: 'Ralph P. Grimaldi',
      isbn_13: '978-0201726343',
      image_url: 'http://ecx.images-amazon.com/images/I/5101lUV-muL._SX402_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 9,
      title: 'Data Structures and Problem Solving Using Java (4th Edition)',
      author: 'Mark Allen Weiss',
      isbn_13: '978-0321541406',
      image_url: 'http://ecx.images-amazon.com/images/I/41tM53xZa5L._SX402_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 10,
      title: 'Python for Everyone (1st Edition)',
      author: 'Cay S. Horstmann, Rance D. Necaise',
      isbn_13: '978-1118626139',
      image_url: 'http://ecx.images-amazon.com/images/I/514hzFfzmmL._AC_UL320_SR256,320_.jpg'
    }),

    knex('books').insert({
      id: 11,
      title: 'Advanced Engineering Mathematics (5th Edition)',
      author: 'Dennis G. Zill, Warren S. Wright',
      isbn_13: '978-1449691721',
      image_url: 'http://ecx.images-amazon.com/images/I/41m-SfqK6iL._SX389_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 12,
      title: 'Campbell Biology (10th Edition)',
      author: 'Jane B. Reece, Lisa A. Urry, Michael L. Cain, Steven A. Wasserman, Peter V. Minorsky, Robert B. Jackson',
      isbn_13: '978-0321834959',
      image_url: 'http://ecx.images-amazon.com/images/I/41B8tOvRAuL._SX412_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 13,
      title: 'Chemistry: A Molecular Approach (3rd Edition)',
      author: 'Nivaldo J. Tro',
      isbn_13: '978-0321809247',
      image_url: 'http://ecx.images-amazon.com/images/I/51S40Hz-%2BUL._SX387_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 14,
      title: 'Sustainability Principles and Practice (1st Edition)',
      author: 'Margaret Robertson',
      isbn_13: '978-0415840187',
      image_url: 'http://ecx.images-amazon.com/images/I/41HDLmKYHDL._SX349_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 15,
      title: 'Software & Systems Requirements Engineering: In Practice',
      author: 'Brian Berenbach, Daniel Paulish, Juergen Kazmeier, Arnold Rudorfer',
      isbn_13: '978-0071605472',
      image_url: 'http://ecx.images-amazon.com/images/I/51oNORqk1XL._SY344_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 16,
      title: 'Pasajes: Lengua (7th Edition)',
      author: 'Mary Lee Bretz, Trisha Dvorak, Carl Kirschner, Rodney Bransdorfer',
      isbn_13: '978-0073385235',
      image_url: 'http://ecx.images-amazon.com/images/I/51yYwWJAulL._SX258_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 17,
      title: '',
      author: '',
      isbn_13: '',
      image_url: ''
    })

    // knex('books').insert({
    //   id: 18,
    //   title: '',
    //   author: '',
    //   isbn_13: '',
    //   image_url: ''
    // }),
    //
    // knex('books').insert({
    //   id: 19,
    //   title: '',
    //   author: '',
    //   isbn_13: '',
    //   image_url: ''
    // }),
    //
    // knex('books').insert({
    //   id: 20,
    //   title: '',
    //   author: '',
    //   isbn_13: '',
    //   image_url: ''
    // }),
    //
    // knex('books').insert({
    //   id: 21,
    //   title: '',
    //   author: '',
    //   isbn_13: '',
    //   image_url: ''
    // })
  );
};
