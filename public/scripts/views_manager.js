/* eslint-disable no-undef */
let applyPopups = () => {};

$(() => {

  applyPopups = (data) => {
    // Applies click handler for all product images
    $('.product').click(function (event) {
      const id = $(this).attr('id');
      // Take ID for product and generates popup details.
      $window.generatePopup(id);
    });
  };

});

