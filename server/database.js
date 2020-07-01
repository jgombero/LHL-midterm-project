
// db is the database passed through from Server.js.
// options is the object that is sent from the AJAX request.
const getAllProductsFromDB = function(db, options, limit = 10) {
  console.log('options for database.getAllProducts: ', options);
  const queryParams = [];

  console.log('SQ request options: ', options);

  let queryString = `SELECT products.*, categories.id AS category_id, categories.name AS category_name
  FROM products
  LEFT JOIN categories ON categories.id = category_id
  `;

  // Run function each time a new search parameter is added.
  const nextParam = () => {
    if (queryParams.length) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }
  };

  // Modify search if product_id is included in options.
  if (options.product_id) {
    nextParam();
    queryParams.push(`${options.product_id}`);
    queryString += `products.id = $${queryParams.length} `;
  }

  if (options.category_id) {
    nextParam();
    queryParams.push(`${options.category_id}`);
    queryString += `categories.id = $${queryParams.length} `;
  }

  if (options.category_name) {
    nextParam();
    queryParams.push(`${options.category_name}`);
    queryString += `categories.name = $${queryParams.length} `;
  }

  if (options.min_price) {
    nextParam();
    queryParams.push(`${options.min_price * 100}`);
    queryString += `products.price >= $${queryParams.length} `;
  }

  if (options.max_price) {
    nextParam();
    queryParams.push(`${options.max_price * 100}`);
    queryString += `products.price <= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length};
  `;

  console.log('Products query string: ', queryString);
  console.log('Product query params: ', queryParams);

  return db.query(queryString, queryParams)
    .then(res => res.rows);
};

exports.getAllProductsFromDB = getAllProductsFromDB;

const getAllCategories = function(db, options, limit = 20) {
  let queryString = `SELECT categories.name AS category_name, categories.id AS category_id
  FROM categories
  ORDER BY category_name
  LIMIT $1
  `;

  return db.query(queryString, [limit])
    .then(res => res.rows);
};

exports.getAllCategories = getAllCategories;

const getUserWithEmail = function(db, email) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email = $1;
  `, [ email ])
    .then(res => {
      return res.rows[0];
    })
};

exports.getUserWithEmail = getUserWithEmail;

const getUserMessages = function(db, userID) {
  return db.query(`
  SELECT DISTINCT products.owner_id, products.id AS product_id, messages.id AS message_id, messages.from_user_id, products.name, products.photo_url, message_text, users.name AS owner_name, u2.name AS sender_name
  FROM messages
  JOIN products ON (products.id = messages.product_id)
  JOIN users ON (users.id = products.owner_id)
  JOIN users u2 ON (u2.id = messages.from_user_id)
  WHERE products.owner_id = $1 OR messages.from_user_id = $1;
  `, [userID])
    .then(res => {
      console.log('Messages SQL response:', res);
      return res.rows;
    });
};

exports.getUserMessages = getUserMessages;

const getUniqueMessageTopics = function(db, userID) {
  return db.query(`
  SELECT DISTINCT products.owner_id, messages.from_user_id, products.name, products.photo_url, users.name AS owner_name, u2.name AS sender_name, products.id AS product_id
  FROM messages
  JOIN products ON (products.id = messages.product_id)
  JOIN users ON (users.id = products.owner_id)
  JOIN users u2 ON (u2.id = messages.from_user_id)
  WHERE products.owner_id = $1 OR messages.from_user_id = $1
  GROUP BY products.owner_id, messages.from_user_id, products.id, products.name, products.photo_url, users.name, u2.name;
  `, [userID])
    .then(res => {
      console.log('Messages SQL response:', res);
      return res.rows;
    });
};

exports.getUniqueMessageTopics = getUniqueMessageTopics;
