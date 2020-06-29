
// db is the database passed through from Server.js.
// options is the object that is sent from the AJAX request.
const getAllProductsFromDB = function(db, options, limit = 10) {
  console.log('options for database.getAllProducts: ', options);
  const queryParams = [];

  let queryString = `SELECT products.*
  FROM products`;

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
