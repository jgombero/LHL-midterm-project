const $logInForm = $(`<h1>Log In!</h1>

<div class="login-form">
<form id="login-form" method="POST" action="/users/login">
    <h2 class="text-center">Log in</h2>
    <div class="form-group">
      <input type="email" class="form-control" name="user_email" placeholder="email@example.com">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" name="user_password" id="inputPassword" placeholder="Password">
    </div>
    <div class="form-group">
        <button type="submit" class="btn login-button btn-block">Log in</button>
    </div>
</form>
</div>
</body>`);

const applyLoginOverride = function() {
  $('#login-form').on('submit', function(event) {
    event.preventDefault();
    console.log('Login form submitted');

    const data = $(this).serialize();
    console.log(data);
    login(data)
      .then(json => {
        console.log(json);
        location.reload();
        views_manager.show('product');
      });
  });
};

$(() => {

});


