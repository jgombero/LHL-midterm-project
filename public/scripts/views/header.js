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
      renderListings(json.favorites);
      // views_manager.show('product');
    })
  });

  $('#add_product').click(function() {

  });

  $('#my_products').click(function() {
    getMyProducts()
    .then(function(json) {
      console.log('My JSON products:', json);
      renderListings(json.myProducts);
      // views_manager.show('product');
    });
  });

  $('#messages').click(function() {
    views_manager.show('messages');

  });
});


