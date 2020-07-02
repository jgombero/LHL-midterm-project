/* eslint-disable no-undef */
let $messages = $('No Messages');
let $section;
// Not too sure if right, but trying to setup views_manager

window.views_manager = {};
$(() => {


  window.views_manager.show = function(item) {

    let $products = $('#main-container');

    // Stores main-container locally, to be retrieved later.
    // "Pass-by-reference - HTML won't be modified by Empty or Detatch.
    // Reccomendation: Don't empyt or detach main-container outside of this file
    // (in the future)
    let myProducts = $('#main-container').html();
    $section = $('main');
    $products.empty();
    $sidebar.detach();
    $logInForm.detach();
    $signUpForm.detach();
    $searchbar.detach();
    // $messages.detach();
    $('#messages-container').remove();
    $newProduct.detach();
    $('#search-bar-text').val('');
    $('#search-bar').find('input:text').val('');




    switch(item) {
    case 'product':
      // $products = $('#main-container');
      $products = $(myProducts);


      console.log('CAN YOU SEE ME', myProducts, $products.html());
      $sidebar.appendTo($section);
      $products.appendTo($section);
      $searchbar.prependTo($section);

      break;
    case 'newProduct':
      $newProduct.appendTo($section);
      break;
    case 'logIn':
      console.log('IN THE VIEWS MANAGER LOG IN');
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
    case 'clear':
      break;
    }
  };

});
