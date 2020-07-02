
const getMyDetails = function() {
  return $.ajax({
    url: 'api/users/getDetails'
  });
}

const login = function(data) {
  console.log('network.js LOGIN function triggered. Data Sent: ', data);
  return $.ajax({
    url: `api/users/login?${data}`
  });
};

const getLoginPage = function(data) {
  return $.ajax({
    url: 'api/users/login/:id',
    data
  })
}

const logOut = function(data) {
  return $.ajax({
    method: 'POST',
    url: 'api/users/logout'
  });
};

const signUp = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/users/',
    data
  });
};

const getSignUpPage = function(data) {
  return $.ajax({
    url: '/users/'
  });
};

const getAllProducts = function(params) {
  let url = '/api/products';
  console.log('Get params: ', params);

  if (params) {
    url += '?' + params;
  }

  console.log(url);

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

const getAllCategories = function(params) {
  let url = '/api/products/categories';
  console.log('Get params: ', params);

  return $.ajax({
    url
  });
};

const toggleFavorite = function(data) {
  // find productID in data
  const productID = data;

  return $.ajax({
    method: 'POST',
    url: `/api/products/save/${productID}`,
    data,
  });
};

const checkFavorite = function(data) {

  const productID = data;

  return $.ajax({
    method: 'GET',
    url: `/api/products/save/${productID}`,
    data,
  });


}

const deleteProduct = function(data) {
  // find productID in data
  const productID = data;

  return $.ajax({
    method: 'POST',
    url: `api/products/delete?${productID}`
  });
};

const getUniqueMessages = function(data) {
  return $.ajax({
    url: '/api/messages/unique',
    data
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

  console.log('send message request', data);

  return $.ajax({
    method: 'POST',
    url:`api/messages/`,
    data
  });
};

const getAllFavorites = function() {
  return $.ajax({
    url: 'api/products/favorites'
  });
};

const getMyProducts = function() {
  return $.ajax({
    url: 'api/products/me'
  });
};
