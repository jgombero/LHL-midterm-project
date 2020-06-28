
const login = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/users/login',
    data
  });
};

const logOut = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/users/logout'
  });
};

const signUp = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/users/',
    data
  });
};

const getAllProducts = function(params) {
  let url = '/api/products';
  console.log('Get params: ', params);

  if (params) {
    url += '?' + params;
  }

  return $.ajax({
    url
  });
};

// creates new product
const addProduct = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/api/products',
    data,
  });
};

const saveProduct = function(data) {
  // find productID in data
  const productID = data;
  // city=calgary&minimum_price_per_night=400&maximum_price_per_night=500&minimum_rating=

  return $.ajax({
    method: 'POST',
    url: `/api/product/${productID}/save`,
    data,
  });
};

const deleteProduct = function(data) {
  // find productID in data
  const productID = data;

  return $.ajax({
    method: 'POST',
    url: `api/product/${productID}/delete`,
    data,
  });
};

const getAllMessages = function(data) {
  return $.ajax({
    url: '/api/messages',
    data
  });
};

const sendMessage = function(data) {
  // find productID in data
  const productID = data;

  return $.ajax({
    method: 'POST',
    url:`api/messages/${productID}`,
    data
  });
};