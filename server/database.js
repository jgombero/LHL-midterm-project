
// db is the database passed through from Server.js.
// options is the object that is sent from the AJAX request.
const getAllProductsFromDB = function(db, options, limit = 10) {
  // console.log('options for database.getAllProducts: ', options);
  const queryParams = [];

  console.log(options);

  // console.log('SQ request options: ', options);

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

  if (options.search_param) {
    nextParam();
    queryParams.push(`%${options.search_param}%`);
    queryString += `LOWER(products.name) LIKE LOWER(($${queryParams.length})) `;
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
  SELECT DISTINCT products.owner_id, products.id AS product_id, messages.id AS message_id, messages.from_user_id, messages.to_user_id, products.name, products.photo_url, message_text, u3.name AS to_name, u2.name AS from_name, messages.time AS timestamp
FROM messages
JOIN products ON (products.id = messages.product_id)
JOIN users ON (users.id = products.owner_id)
JOIN users u2 ON (u2.id = messages.from_user_id)
JOIN users u3 ON (u3.id = messages.to_user_id)
WHERE messages.to_user_id = $1 OR messages.from_user_id = $1
ORDER BY messages.time;
  `, [userID])
    .then(res => {
      return res.rows;
    });
};

exports.getUserMessages = getUserMessages;

const getUserFavorites = function(db, userID) {
  return db.query(`
  SELECT products.*
  FROM products
  JOIN favorites ON products.id = product_id
  WHERE favorites.user_id = $1;
  `, [ userID ])
  .then(res => {
    return res.rows;
  })
};

exports.getUserFavorites = getUserFavorites;

const getUniqueMessageTopics = function(db, userID) {
  return db.query(`
  SELECT messages.from_user_id, messages.to_user_id, products.name, products.photo_url, users.name AS owner_name, u2.name AS sender_name, products.id AS product_id
FROM messages
JOIN products ON (products.id = messages.product_id)
JOIN users ON (users.id = products.owner_id)
JOIN users u2 ON (u2.id = messages.from_user_id)
WHERE (messages.to_user_id = $1 OR messages.from_user_id = $1) AND (messages.from_user_id <> products.owner_id)
GROUP BY products.owner_id, messages.from_user_id, messages.to_user_id, products.id, products.name, products.photo_url, users.name, u2.name;
  `, [userID])
    .then(res => {
      return res.rows;
    });
};

exports.getUniqueMessageTopics = getUniqueMessageTopics;

const postNewMessage = function(db, messageData) {
  // console.log('final message data in query', messageData);

  return db.query(`
  INSERT INTO messages (from_user_id, to_user_id, product_id, message_text)
  VALUES ($1, $2, $3, $4);
  `, [messageData.from_user_id, messageData.to_user_id, messageData.product_id, messageData.message_text])
    .then(res => {
      // console.log('Response from SQL', res);
      return res.rows;
    });
};

exports.postNewMessage = postNewMessage;

const getUserProducts = function(db, userID) {
  return db.query(`
  SELECT *
  FROM products
  WHERE products.owner_id = $1;
  `, [ userID ])
  .then(res => res.rows);
};

exports.getUserProducts = getUserProducts;

const postNewProduct = function(db, productData) {
const queryParams = [ productData.owner_id, productData.title, productData.description, productData.price, productData.category, productData.photo_url ];

let queryString = `
INSERT INTO products (owner_id, name, description, price, category_id, photo_url)
VALUES ($1, $2, $3, $4, $5, $6);
`;

  return db.query(queryString, queryParams)
  .then(res => res.rows);
};

exports.postNewProduct = postNewProduct;

const getCurrentUser = function(db, userID) {
  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1;
  `, [ userID ])
    .then(res => res.rows[0]);
};

exports.getCurrentUser = getCurrentUser;

const toggleFavorites = function (db, userID, productID) {
  return db.query(`
  INSERT INTO favorites (product_id, user_id, favorited) VALUES ($2, $1, TRUE)
  ON CONFLICT (product_id, user_id)
  DO UPDATE SET favorited = NOT favorites.favorited WHERE favorites.product_id = $2 AND favorites.user_id = $1
  `, [userID, productID]);
};

exports.toggleFavorites = toggleFavorites;

const checkFavorite = function (db, userID, productID) {
  return db.query(`
  SELECT * from favorites where user_id = $1 AND product_id = $2;
  `, [userID, productID]);
};

exports.checkFavorite = checkFavorite;

const deleteProduct = function(db, productID) {
  return db.query(`
  DELETE FROM products
  WHERE id = $1;
  `, [ productID ])
  .then(res => res.rows);
};

exports.deleteProduct = deleteProduct;
