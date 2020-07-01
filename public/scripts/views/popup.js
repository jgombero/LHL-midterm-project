let $window;
let $popup;

$(() => {
  $window = $('window');
  $window.generatePopup = (id) => {

    const idStr = "product_id=" + id.slice(8,20);
    console.log('idStr::', idStr);

    getAllProducts(idStr).then(function(json) {
      const productObj = json.products[0];
      console.log(productObj);
      console.log('product obj to render popup', json.products);
      let $popup = $(`<div id='popup' class='popup'>
      <article class="inner-product-box product-detail-box">
        <div class='inner-product-header'>
          <span class="close">&times;</span>
        </div>
        <img src="${productObj.photo_url}" alt="" class="popup-product-image">
        <div class="inner-product-datails">
          <h3>${productObj.name}</h3>
          <p class="inner-product-description">${productObj.description}
          </p>
          <div class="inner-product-footer">
            <h3>$${(productObj.price / 100).toFixed(2)}</h3>
            <span class="close">&hearts;</span>
          </div>
          <form id="send-message-form" product-id="${productObj.id}" owner-id="${productObj.owner_id}">
             <div class="inner-product-footer">
              <label for="message-box"></label>
              <input id="message-box" type="text" name="message_text" placeholder="Is this product still available?">
              <button id="submit-message-button" type="submit">Send</button>
            </div>
          </form>
        </div>
      </article>
      </div>`);

      $popup.appendTo('body');

      const popup = $('#popup');
      const popupID = document.getElementById('popup');
      const innerPopup = $('.inner-product-box');
      popup.addClass('showContainer');
      innerPopup.addClass('show');
      $('main').addClass('blur');
      $('header').addClass('blur');
      // When close button on popup is clicked.
      $('.close').click(function(event) {
        popup.remove();
        $('main').removeClass('blur');
        $('header').removeClass('blur');
        applyPopups();
      });
      // Handles clicking outside of product box.
      window.onclick = function (event) {
        if (event.target === popupID) {
          $('header').removeClass('blur');
          $('main').removeClass('blur');
          popup.remove();
          applyPopups();
        }
      };

      $('#send-message-form').submit(function(event) {
        event.preventDefault();
        let data = $(this).serialize();
        const productID=$(this).attr('product-id');
        const ownerID = $(this).attr('owner-id');
        data += `&product_id=${productID}&to_user_id=${ownerID}`;

        console.log(data);
        sendMessage(data).then(function (json) {
          $('#send-message-form').html('Message Sent!');
        });



      })
    });



  }

});
