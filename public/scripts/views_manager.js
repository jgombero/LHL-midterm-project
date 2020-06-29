$(() => {
  console.log('doc loaded');

  $('#test-form').submit(function (event) {
    event.preventDefault();
    console.log('test');

    const data = $(this).serialize();
    console.log('example data from form', data);
    sendMessage(data).then(function (json) {
      console.log('json received from AJAX promise: ', json);
    });
  });



  const testButton = $('#test-button');
  const popup = $('#popup');
  const popupID = document.getElementById('popup');

  $('.product').click(function (event) {
    console.log('test');
    popup.addClass('show');
    // $('body').addClass('body-grey')
    $('main').addClass('blur')
  })

  window.onclick = function (event) {
    if (event.target === popupID) {
      popup.removeClass('show');
      // $('body').removeClass('body-grey')
      $('main').removeClass('blur')
    }
  }



});

