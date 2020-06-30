/* eslint-disable no-undef */


// Not too sure if right, but trying to setup views_manager
const $section = $('#main-container');

window.views_manager = {};

window.views_manager.show = function(item) {
  $products.detach();
  $logInForm.detach();
  $signUpForm.detach();
  $messages.detach();
  $newProduct.detach();

  switch(item) {
    case 'product':
      $product.appendTo($section);
      break;
    case 'newProduct':
      $newProduct.appendTo($section);
      break;
    case 'logIn':
      $logInForm.appendTo($section);
      break;
    case 'signUp':
      $signUpForm.appendTo($section);
      break;
    case 'messages':
      $messages.appendTo($section);
      break;
  }
}

