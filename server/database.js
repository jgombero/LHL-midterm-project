
// db is the database passed through from Server.js.
// options is the object that is sent from the AJAX request.
const getAllProductsFromDB = function(db, options, limit = 10) {
  console.log('options for database.getAllProducts: ', options);
  const queryParams = [];

  let queryString = `SELECT products.*, categories.*
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
    queryParams.push(`${options.categories_id}`);
    queryString += `categories.id = $${queryParams.length} `;
  }

  if (options.min-price) {
    nextParam();
    queryParams.push(`${options.min-price}`);
    querString += `products.price >= $${queryParams.length} `;
  }

  if (options.max-price) {
    nextParam();
    queryParams.push(`${options.max-price}`);
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
