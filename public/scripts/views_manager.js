/* eslint-disable no-undef */
let $messages = $('No Messages');

// Not too sure if right, but trying to setup views_manager

$(() => {

  const $products = $('#main-container');


  window.views_manager.show = function(item) {

    const $section = $('main');
    $products.detach();
    $sidebar.detach();

    $logInForm.detach();
    $signUpForm.detach();
    $messages.detach();
    // $newProduct.detach();

    switch(item) {
      case 'product':
        $sidebar.appendTo($section);
        $products.appendTo($section);
        break;
      case 'newProduct':
        $newProduct.appendTo($section);
        break;
      case 'logIn':
        $logInForm.appendTo($section);
        applyLoginOverride();
        break;
      case 'signUp':
        $signUpForm.appendTo($section);
        break;
      case 'messages':
        updateMessages();
        $messages.appendTo($section);
        break;
    }
  };

});
