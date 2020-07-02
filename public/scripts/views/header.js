let $header;

$(() => {
  // renderHeader();

  $('#log_in').click(function() {
    views_manager.show('logIn');
  });

  $('#log_out').click(function() {
    logOut()
    .then(res => {
      location.reload();
      views_manager.show('product');
    });

  });

  $('#favorites').click(function() {
    getAllFavorites()
    .then(function(json) {
      views_manager.show('clear');
      renderListings(json.favorites);
      // views_manager.show('product');
    })
  });

  $('#add_product').click(function() {
    views_manager.show('newProduct');
  });

  $('#my_products').click(function() {
    getMyProducts()
    .then(function(json) {
      views_manager.show('clear');
      console.log('My JSON products:', json);
      renderListings(json.myProducts);
    });
  });

  $('#messages').click(function() {
    views_manager.show('messages');

  });
});


