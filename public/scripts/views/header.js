let $header;

$(() => {
  // renderHeader();

  $('#log_in').click(function() {
    views_manager.show('logIn');
  });

  $('#log_out').click(function() {
    logOut();
    views_manager.show('product');
  });

  $('#favorites').click(function() {

  });

  $('#add_property').click(function() {

  });

  $('#my_properties').click(function() {

  });

  $('#messages').click(function() {
    views_manager.show('messages');

  });
});


