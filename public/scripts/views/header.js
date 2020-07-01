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

  $('#add_property').click(function() {

  });

  $('#my_properties').click(function() {

  });

  $('#messages').click(function() {
    views_manager.show('messages');

  });
});


