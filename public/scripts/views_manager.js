/* eslint-disable no-undef */
$(() => {

  const testButton = $('#test-button');
  const innerPopup = $('.inner-product-box');
  const popup = $('#popup');
  const popupID = document.getElementById('popup');
  $('.close').click(function(event) {
    popup.removeClass('showContainer');
    innerPopup.removeClass('show');
    $('main').removeClass('blur');
  });

  $('.product').click(function (event) {
    $popup.appendTo('body');
    console.log('test');
    innerPopup.addClass('show');
    popup.addClass('showContainer');
    $('main').addClass('blur');
  })

  window.onclick = function (event) {
    if (event.target === popupID) {
      popup.removeClass('showContainer');
      innerPopup.removeClass('show');
      $('main').removeClass('blur');
    }
  };



});

