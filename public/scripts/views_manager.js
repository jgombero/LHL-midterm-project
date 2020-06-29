/* eslint-disable no-undef */
$(() => {

  const testButton = $('#test-button');
  const popup = $('#popup');
  const popupID = document.getElementById('popup');
  $('.close').click(function(event) {
    popup.removeClass('show');
    $('main').removeClass('blur');
  });

  $('.product').click(function (event) {
    console.log('test');
    popup.addClass('show');
    // $('body').addClass('body-grey')
    $('main').addClass('blur')
  })

  window.onclick = function (event) {
    if (event.target === popupID) {
      popup.removeClass('show');
      $('main').removeClass('blur')
      // $('body').removeClass('body-grey')
    }
  }



});

