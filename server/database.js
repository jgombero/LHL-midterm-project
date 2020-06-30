
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

  // if (options.owner_id) {
  //   nextParam();
  //   queryParams.push(`${options.owner_id}`);
  //   queryString += `favorites.user_id = $${queryParams.length} `;
  // }

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

getUserWithEmail = function(email) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email = $1;
  `, [ email ])
  .then(res => res.rows[0]);
}
