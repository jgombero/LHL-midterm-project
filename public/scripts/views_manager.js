/* eslint-disable no-undef */
$(() => {

  $('.product').click(function (event) {
    console.log($(this).serialize());
    $window.generatePopup();
    $window.popup.appendTo('body');
    const popup = $('#popup');
    const popupID = document.getElementById('popup');
    const innerPopup = $('.inner-product-box');
    popup.addClass('showContainer');
    innerPopup.addClass('show');
    $('main').addClass('blur');
    // When close button on popup is clicked.
    $('.close').click(function(event) {
      popup.removeClass('showContainer');
      innerPopup.removeClass('show');
      $('main').removeClass('blur');
    });
    // Handles clicking outside of product box.
    window.onclick = function (event) {
      console.log(event.target);
      if (event.target === popupID) {
        popup.removeClass('showContainer');
        innerPopup.removeClass('show');
        $('main').removeClass('blur');
      }
    };
  });

});

