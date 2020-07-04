
let $popup;

$(() => {
  $window = $('window');
  $window.generatePopup = (id) => {

    const idStr = "product_id=" + id.slice(8, 20);
    console.log('idStr::', idStr);

    getAllProducts(idStr).then(function (json) {
      const productObj = json.products[0];
      console.log(productObj);
      console.log('product obj to render popup', json.products);
      const ownerID = productObj.owner_id;

      getMyDetails()
        .then(json => {
          const userID = json.user.id;

          let $popup;

          if (userID !== ownerID) {
            $popup = $(`
            <div id='popup' class= 'popup'>
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
                      <span id="favorite-button" class="favorite" product-id=${productObj.id}>&hearts;</span>
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
          } else {
            $popup = $(`
        <div id='popup' class='popup'>
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
              <span id="favorite-button" class="favorite" product-id=${productObj.id}>&hearts;</span>
            </div>
            <div id="sold-and-delete">
              <button type="submit" id="sold-button">Mark as sold</button>
              <button type="submit" id="delete-button">Delete</button>
            </div>
          </article>
          </div>
        `);
          }

          $popup.appendTo('body');

          if (!productObj.available) {
            $('#sold-button').text('List for Sale')
          }

          const popup = $('#popup');
          const popupID = document.getElementById('popup');
          const innerPopup = $('.inner-product-box');
          popup.addClass('showContainer');
          innerPopup.addClass('show');
          $('main').addClass('blur');
          $('header').addClass('blur');


          // When close button on popup is clicked.
          $('.close').click(function (event) {
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

          $('#send-message-form').submit(function (event) {
            event.preventDefault();
            let data = $(this).serialize();
            const productID = $(this).attr('product-id');
            const ownerID = $(this).attr('owner-id');
            data += `&product_id=${productID}&to_user_id=${ownerID}`;

            console.log(data);
            sendMessage(data).then(function (json) {
              $('#send-message-form').html('Message Sent!');
            });
          });

          $('#delete-button').click(function (event) {
            event.preventDefault();
            const data = `product_id=${productObj.id}`;

            deleteProduct(data)
              .then(json => {
                getMyProducts()
                  .then(function (json) {
                    views_manager.show('clear');
                    console.log('My JSON products:', json);
                    renderListings(json.myProducts);
                    popup.remove();
                    $('main').removeClass('blur');
                    $('header').removeClass('blur');
                    // applyPopups();
                  });
              });
          });

          $('#sold-button').click(function(event) {
            event.preventDefault();
            const data = `product_id=${productObj.id}`;

            markProductSold(data)
            .then(json => {
              getMyProducts()
              .then(function (json) {
                views_manager.show('clear');
                console.log('My JSON products:', json);
                renderListings(json.myProducts);
                popup.remove();
                $('main').removeClass('blur');
                $('header').removeClass('blur');
                // applyPopups();
              });
            });
          });

          const toggleFavCSS = function(elem) {
            if (elem.attr('favoriteBool') === 'true') {
              elem.removeClass('favorited');
              $('#favorite-button').attr('favoriteBool','false');
            } else {
              elem.addClass('favorited');
              $('#favorite-button').attr('favoriteBool','true');
            }
          };

          $('.favorite').click(function (event) {
            const prodID = $(this).attr('product-id');
            toggleFavCSS($(this));
            toggleFavorite(prodID).then(function (res) {
            });
          });

          // Checks favorite status and applies CSS.
          checkFavorite(productObj.id).then(function(json) {
            // console.log('return from checkFavorite: ', json.rows[0]);
            if (json.rows[0]) {
              if (json.rows[0]['favorited']) {
                $('#favorite-button').addClass('favorited');
                $('#favorite-button').attr('favoriteBool','true');
                // console.log('item IS favorited');
              } else {
                // console.log('item is NOT favorited');
                $('#favorite-button').attr('favoriteBool','false');
              }
            } else {
              // console.log('item is NOT favorited');
              $('#favorite-button').attr('favoriteBool','false');
            }
          });
        });
    });
  };
});
