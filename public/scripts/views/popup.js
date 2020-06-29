let $window;

$(() => {
  $window = $('window');
  $window.generatePopup = (id) => {

    const idStr = "product_id=" + id.slice(8,20);

    getAllProducts(idStr).then(function(json) {
      const productObj = json.products[0];
      console.log(productObj);
      let $popup = $(`<div id='popup' class='popup'>
      <article class="inner-product-box product-detail-box">
        <div class='inner-product-header'>
          <span class="close">&times;</span>
        </div>
        <img src="${productObj.photo_url}" alt="" class="product-image">
        <div class="inner-product-datails">
          <h3>${productObj.name}</h3>
          <p class="inner-product-description">${productObj.description}
          </p>
          <div class="inner-product-footer">
            <h3>$${(productObj.price / 100).toFixed(2)}</h3>
            <span class="close">&hearts;</span>
          </div>
          <form id="send-message-form">
             <div class="inner-product-footer">
              <label for="message-box"></label>
              <input id="message-box" type="text" name="send_message_text" placeholder="Is this product still available?">
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
          popup.remove();
          popup.removeClass('showContainer');
          innerPopup.removeClass('show');
          $('main').removeClass('blur');
        }
      };

      // return $popup;
    })
      .then(
        console.log("HELLLLOOO")
      );



  }

});
