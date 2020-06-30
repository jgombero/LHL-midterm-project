$(() => {

  const renderHeader = function(user) {

    if (!user) {
      // change one of the first icons in if/else
      const $header = `
      <i class="fa fa-user" aria-hidden="true"></i>
      <i id="favorites" class="fa fa-heart-o"></i>
      <i id="add_property" class="fa fa-plus" aria-hidden="true"></i>
      <i id="my_properties" class="fa fa-briefcase" aria-hidden="true"></i>
      <i id="messages" class="fa fa-envelope" aria-hidden="true"></i>
      `;
    } else {
      const $header = `
      <i class="fa fa-user" aria-hidden="true"></i>
      <i id="favorites" class="fa fa-heart-o"></i>
      <i id="add_property" class="fa fa-plus" aria-hidden="true"></i>
      <i id="my_properties" class="fa fa-briefcase" aria-hidden="true"></i>
      <i id="messages" class="fa fa-envelope" aria-hidden="true"></i>
      `;
    }

    $('#main-header').append($header);
  };

  $('#favorites').click(function() {

  });

  $('#add_property').click(function() {

  });

  $('#my_properties').click(function() {

  });

  $('#messages').click(function() {

  });
});


