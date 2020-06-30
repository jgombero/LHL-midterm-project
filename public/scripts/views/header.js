let $header;
const renderHeader = function() {

  if (!req.session.user_id) {
    // change one of the first icons in if/else
    $header = `
    <ul>
      <li>
        <i id="log_in" class="fa fa-user" aria-hidden="true"></i>
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
  console.log('In the function')
  $('#main-header').append($header);
}



$(() => {
  console.log('On document Ready');
  renderHeader();

  $('#log_in').click(function() {
    views_manager.show('logIn');
  });

  $('#favorites').click(function() {

  });

  $('#add_property').click(function() {

  });

  $('#my_properties').click(function() {

  });

  $('#messages').click(function() {

  });
});


