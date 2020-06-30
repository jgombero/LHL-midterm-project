$(() => {

  const renderHeader = function(user) {

    let $header;

    if (!user) {
      // change one of the first icons in if/else
      $header = `
      <ul>
        <li>
          <i class="fa fa-user" aria-hidden="true"></i>
        </li>
        <li>
          <i id="favorites" class="fa fa-heart-o"></i>
        </li>
        <li>
          <i id="add_property" class="fa fa-plus" aria-hidden="true"></i>
        </li>
        <li>
          <i id="my_properties" class="fa fa-briefcase" aria-hidden="true"></i>
        </li>
        <li>
          <i id="messages" class="fa fa-envelope" aria-hidden="true"></i>
        </li>
      </ul>
      `;
    } else {
      $header = `
      <ul>
        <li>
          <i class="fa fa-user" aria-hidden="true"></i>
        </li>
        <li>
          <i id="favorites" class="fa fa-heart-o"></i>
        </li>
        <li>
          <i id="add_property" class="fa fa-plus" aria-hidden="true"></i>
        </li>
        <li>
          <i id="my_properties" class="fa fa-briefcase" aria-hidden="true"></i>
        </li>
        <li>
          <i id="messages" class="fa fa-envelope" aria-hidden="true"></i>
        </li>
      </ul>
      `;
    }

    $('#main-header').append($header);
  };
  renderHeader();

  $('#favorites').click(function() {

  });

  $('#add_property').click(function() {

  });

  $('#my_properties').click(function() {

  });

  $('#messages').click(function() {

  });
});


