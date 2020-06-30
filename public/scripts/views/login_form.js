const $logInForm = $(`<h1>Log In!</h1>
<form id="login-form" method="POST" action="/users/login">
  <label for="user_email"></label>
  <input type="email" name="user_email" placeholder="Email Address">
  <label for="user_password"></label>
  <input type="password" name="user_password" placeholder="Password>
  <button type-"submit">
    Log In
  </button>
</form>`);

$(() => {

  $('#login-form').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    console.log(data);
    login(data)
    .then(json => {
      console.log(json);
      views_manager.show('products');
    });
  });

});


