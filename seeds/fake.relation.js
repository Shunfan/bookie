
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').insert({
      // id: 1,
      user_id: 1,
      book_id: 1,
      description: 'like New',
      condition: 5,
      price: 30,
      active: true,
      created_at: new Date('May 1, 2016')
    }),

    knex('posts').insert({
      // id: 2,
      user_id: 12,
      book_id: 1,
      description: 'like new',
      condition: 3,
      price: 23,
      active: true,
      created_at: new Date('October 29, 2015')
    }),

    knex('posts').insert({
      // id: 3,
      user_id: 2,
      book_id: 1,
      description: 'New',
      condition: 4,
      price: 25,
      active: true,
      created_at: new Date('April 30, 2016')
    }),
    
    knex('posts').insert({
      //id: 4,
      user_id: 3,
      book_id: 3,
      description: 'New',
      condition: 5,
      price: 30,
      active: true,
      created_at: new Date('May 18, 2016')
    }),

    knex('posts').insert({
      //id: 5,
      user_id: 3,
      book_id: 4,
      description: 'meh',
      condition: 3,
      price: 50,
      active: true,
      created_at: new Date('March 10, 2016')
    }),

    knex('posts').insert({
      //id: 6,
      user_id: 17,
      book_id: 2,
      description: 'Used 5 times',
      condition: 4,
      price: 30,
      active: true,
      created_at: new Date('March 20, 2016')
    }),

    knex('posts').insert({
      //id: 7,
      user_id: 4,
      book_id: 4,
      description: 'Used for a quarter',
      condition: 4,
      price: 60,
      active: false,
      created_at: new Date('March 20, 2016')
    }),

    knex('posts').insert({
      //id: 8,
      user_id: 6,
      book_id: 2,
      description: 'used a lot',
      condition: 2,
      price: 15,
      active: true,
      created_at: new Date('February 10, 2016')
    }),

    knex('posts').insert({
      //id: 9,
      user_id: 17,
      book_id: 3,
      description: 'used twice',
      condition: 4,
      price: 40,
      active: false,
      created_at: new Date('May 10, 2015')
    }),

    knex('posts').insert({
      //id: 10,
      user_id: 7,
      book_id: 3,
      description: 'Literally falling apart',
      condition: 1,
      price: 1,
      active: true,
      created_at: new Date('January 28, 2016')
    }),

    knex('posts').insert({
      //id: 11,
      user_id: 15,
      book_id: 4,
      description: 'New',
      condition: 5,
      price: 85,
      active: true,
      created_at: new Date('December 25, 2015')
    }),

    knex('posts').insert({
      //id: 12,
      user_id: 10,
      book_id: 2,
      description: 'New',
      condition: 5,
      price: 40,
      active: true,
      created_at: new Date('December 25, 2015')
    }),

    knex('posts').insert({
      //id: 13,
      user_id: 17,
      book_id: 2,
      description: 'Smells real bad',
      condition: 3,
      price: 30,
      active: false,
      created_at: new Date('May 3, 2016')
    }),

    knex('posts').insert({
      //id: 14,
      user_id: 10,
      book_id: 5,
      description: 'at the bottom of the lake',
      condition: 1,
      price: 0,
      active: true,
      created_at: new Date('April 1, 2016')
    }),

    knex('posts').insert({
      //id: 15,
      user_id: 17,
      book_id: 4,
      description: 'Spilled Coffee on it',
      condition: 2,
      price: 20,
      active: true,
      created_at: new Date('April 28, 2016')
    }),

    knex('posts').insert({
      //id: 16,
      user_id: 17,
      book_id: 4,
      description: 'Wow :(',
      condition: 1,
      price: 5,
      active: false,
      created_at: new Date('January 2, 2016')
    }),

    knex('posts').insert({
      //id: 17,
      user_id: 7,
      book_id: 4,
      description: 'Piece of garbage',
      condition: 1,
      price: 20,
      active: true,
      created_at: new Date('April 1, 2016')
    }),

    knex('posts').insert({
      //id: 18,
      user_id: 17,
      book_id: 8,
      description: 'Bonkers',
      condition: 5,
      price: 100,
      active: false,
      created_at: new Date('May 18, 2016')
    }),

    knex('posts').insert({
      //id: 19,
      user_id: 17,
      book_id: 5,
      description: 'Looks crappy',
      condition: 1,
      price: 10,
      active: false,
      created_at: new Date('February 27, 1996')
    }),

    knex('posts').insert({
      //id: 20,
      user_id: 17,
      book_id: 4,
      description: 'brand new',
      condition: 5,
      price: 70,
      active: false,
      created_at: new Date('May 18, 2016')
    }),
    
    knex('posts').insert({
      //id: 21,
      user_id: 12,
      book_id: 4,
      description: 'Used 10 times',
      condition: 4,
      price: 65,
      active: false,
      created_at: new Date('May 2, 2016')
    }),
    
    knex('posts').insert({
      //id: 22,
      user_id: 11,
      book_id: 4,
      description: 'used as a napkin',
      condition: 2,
      price: 45,
      active: false,
      created_at: new Date('March 31, 2016')
    }),
    
    knex('posts').insert({
      //id: 23,
      user_id: 10,
      book_id: 4,
      description: 'New!',
      condition: 5,
      price: 80,
      active: false,
      created_at: new Date('June 20, 2016')
    }),
    
    knex('posts').insert({
      //id: 24,
      user_id: 20,
      book_id: 4,
      description: 'A couple minor rips',
      condition: 4,
      price: 55,
      active: false,
      created_at: new Date('May 12, 2016')
    }),  
    
    knex('posts').insert({
      //id: 25,
      user_id: 3,
      book_id: 4,
      description: 'If it were an Iphone the screen would be really cracked',
      condition: 2,
      price: 40,
      active: false,
      created_at: new Date('January 21, 2016')
    }),
    
    knex('posts').insert({
      //id: 26,
      user_id: 6,
      book_id: 4,
      description: 'just bad',
      condition: 1,
      price: 10,
      active: false,
      created_at: new Date('March 10, 2016')
    }),
    
    knex('posts').insert({
      //id: 27,
      user_id: 14,
      book_id: 4,
      description: 'mediocre',
      condition: 3,
      price: 65,
      active: false,
      created_at: new Date('December 4, 2015')
    }),

    // fake transactions
    knex('transactions').insert({
      //id: 1,
      post_id: 18,
      seller_id: 17,
      buyer_id: 6,
      actual_price: 95,
      rating: 4,
      comment: 'Got a good deal, pupped to learn'
    }),

    knex('transactions').insert({
      //id: 2,
      post_id: 19,
      seller_id: 17,
      buyer_id: 4,
      actual_price: 10,
      rating: 3,
      comment: 'Responded quickly, Kind of a weird dude though'
    }),

    knex('transactions').insert({
      //id: 3,
      post_id: 16,
      seller_id: 17,
      buyer_id: 2,
      actual_price: 5,
      rating: 5,
      comment: 'got me the book quick, even though its really used'
    }),

    knex('transactions').insert({
      //id: 4,
      post_id: 9,
      seller_id: 17,
      buyer_id: 12,
      actual_price: 45,
      rating: 5,
      comment: 'Got back to me so quick I game him an extra five dollars'
    }),

    knex('transactions').insert({
      //id: 5,
      post_id: 20,
      seller_id: 17,
      buyer_id: 16,
      actual_price: 60,
      rating: 4,
      comment: 'Responded a couple days later, but gave me a discount'
    }),

    knex('transactions').insert({
      //id: 6,
      post_id: 13,
      seller_id: 17,
      buyer_id: 20,
      actual_price: 25,
      rating: 1,
      comment: 'not only does the book smell, so did he'
    }),

    knex('transactions').insert({
      //id: 7,
      post_id: 7,
      seller_id: 4,
      buyer_id: 10,
      actual_price: 60,
      rating: 4,
      comment: 'Got me the book fairly quickly'
    }),

    knex('transactions').insert({
      //id: 8,
      post_id: 21,
      seller_id: 12,
      buyer_id: 13,
      actual_price: 65,
      rating: 5,      
      comment: 'Got it to me in the short time frame I had'
    }),

    knex('transactions').insert({
      //id: 9,
      post_id: 22,
      seller_id: 11,
      buyer_id: 2,
      actual_price: 35,
      rating: 1,
      comment: 'The seller made me drive to a scary parking lot'
    }),

    knex('transactions').insert({
      //id: 10,
      post_id: 23,
      seller_id: 10,
      buyer_id: 19,
      actual_price: 80,
      rating: 5,
      comment: 'Sweet deal on a brand new book!'
    }),

    knex('transactions').insert({
      //id: 11,
      post_id: 24,
      seller_id: 20,
      buyer_id: 17,
      actual_price: 55,
      rating: 5,
      comment: 'quick email response'
    }),
    
    knex('transactions').insert({
      //id: 12,
      post_id: 25,
      seller_id: 3,
      buyer_id: 2,
      actual_price: 42,
      rating: 5,
      comment: 'actually brought the book to me, like pizza'
    }),
    
    knex('transactions').insert({
      //id: 13, 
      post_id: 26,
      seller_id: 6,
      buyer_id: 20,
      actual_price: 10,
      rating: 2,
      comment: 'was rude upon pickup'
    }),
    
    knex('transactions').insert({
      //id: 14,
      post_id: 27,
      seller_id: 14,
      buyer_id: 13,
      actual_price: 65,
      rating: 1,
      comment: 'stole my wallet when I got to the meet up site'
    }),
    
    //subscriptions
    knex('books_users').insert({
      //id: 1,
      user_id: 17,
      book_id: 14
    }),
    
    knex('books_users').insert({
      //id: 2,
      user_id: 17,
      book_id: 16
    })
  ); 
};
