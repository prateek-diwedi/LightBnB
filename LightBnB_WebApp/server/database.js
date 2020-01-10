const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city ILIKE $${queryParams.length} `;
  }



  // minimum price  search
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND properties.cost_per_night/100 >= $${queryParams.length} `;
  }

  /// maximum price search
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND properties.cost_per_night/100 <= $${queryParams.length} `;
  }

  // minimum rating 
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND property_reviews.rating >= $${queryParams.length} `;
  }


  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  
  // // owner id
  // queryParams.push(owner_id);
  // queryString += `
  // AND properties.owner_id $${queryParams.length}
 // `;


  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};



// getting user with email
const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1;
  `, [email])
    .then(res => {
      if (res.rows.length) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error('email not found', err));
};

/// getting users id
const getUserWithId = function (id) {
  return pool.query(`
  SELECT id FROM users
  WHERE id = $1;
  `, [id])
    .then(res => {
      if (res.rows.length) {
        return res.rows[0];
      }
      return null;
    })
    .catch(err => console.error('id not found', err));
};


// adding new user to database
const addUser = function (user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ( $1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => {
      if (res.rows.length) {
        res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error('user not added :', err));
};


// get all the reservation of login user
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
  SELECT * FROM reservations
  JOIN property_reviews ON reservation_id = reservations.id
  JOIN users ON users.id = property_reviews.guest_id
  WHERE property_reviews.guest_id = $1
  LIMIT $2;
  `, [guest_id, limit])
    .then(res => {
      console.log('res...', res.rows);
      if (res.rows.length) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch(err => console.error('user not added :', err));
};


const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
    .then(res => {
      console.log("Testing ",res);
      if (res.rows.length) {
        res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error('user not added :', err));
};

exports.getAllReservations = getAllReservations;
exports.getAllProperties = getAllProperties;
exports.getUserWithEmail = getUserWithEmail;
exports.addUser = addUser;
exports.getUserWithId = getUserWithId;
exports.addProperty = addProperty;





// const limit = 10;

// const query = `SELECT *
//                 FROM properties
//                 LIMIT $1;`;

// pool.query(query, limit)
//   .then(res => {
//     console.log(res.rows)
//   });
















// /// Users

// /**
//  * Get a single user from the database given their email.
//  * @param {String} email The email of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
// const getUserWithEmail = function(email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);
// }
// exports.getUserWithEmail = getUserWithEmail;

// /**
//  * Get a single user from the database given their id.
//  * @param {string} id The id of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// }
// exports.getUserWithId = getUserWithId;


// /**
//  * Add a new user to the database.
//  * @param {{name: string, password: string, email: string}} user
//  * @return {Promise<{}>} A promise to the user.
//  */
// const addUser =  function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// }
// exports.addUser = addUser;

// /// Reservations

// /**
//  * Get all reservations for a single user.
//  * @param {string} guest_id The id of the user.
//  * @return {Promise<[{}]>} A promise to the reservations.
//  */
// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }
// exports.getAllReservations = getAllReservations;

// /// Properties

// /**
//  * Get all properties.
//  * @param {{}} options An object containing query options.
//  * @param {*} limit The number of results to return.
//  * @return {Promise<[{}]>}  A promise to the properties.
//  */
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
// exports.getAllProperties = getAllProperties;


// /**
//  * Add a property to the database
//  * @param {{}} property An object containing all of the property details.
//  * @return {Promise<{}>} A promise to the property.
//  */
// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }


