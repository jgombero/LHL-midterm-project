const $logInForm = $(`<h1>Log In!</h1>
<form id="login-form" method="POST" action="/users/login">
  <label for="user_email">Email</label>
  <input type="email" name="user_email" placeholder="Email Address">
  <label for="user_password">Password</label>
  <input type="password" name="user_password" placeholder="Password">
  <button type-"submit">
    Log In
  </button>
</form>`);

const applyLoginOverride = function() {
  $('#login-form').on('submit', function(event) {
    event.preventDefault();
    console.log('Login form submitted');

    const data = $(this).serialize();
    console.log(data);
    login(data)
      .then(json => {
        console.log(json);
        views_manager.show('products');
      });
  });
};

$(() => {

});


