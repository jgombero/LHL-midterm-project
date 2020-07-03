let $header;

$(() => {
  // renderHeader();

  getMyDetails()
    .then(json => {
      let isLoggedIn = false;
      console.log('USER DETAILS:', json);

      if (json.user) {
        isLoggedIn = true;
      }

      $('#log_in').click(function () {
        views_manager.show('logIn');
      });

      $('#log_out').click(function () {
        logOut()
          .then(res => {
            location.reload();
            views_manager.show('product');
          });
      });

      $('#favorites').click(function () {

        if (isLoggedIn) {
          console.log('is Logged IN: ', isLoggedIn)
          getAllFavorites()
            .then(function (json) {
              views_manager.show('clear');
              views_manager.show('product');

              renderListings(json.favorites);
              // views_manager.show('product');
            });
        } else {
          views_manager.show('logIn');
        }
      });

      $('#all_products').click(function () {
        getAllProducts().then(function (json) {
          views_manager.show('clear');
          views_manager.show('product');
          renderListings(json.products);
          renderSearchbar();
          $sidebar.prependTo($section);
          $('#search-bar-text').val('');

          // Normalize items
          $("#all-filters-container").slideUp();
          // applySearchFormHandler();
        });
      });

      $('#add_product').click(function () {
        if (isLoggedIn) {
          views_manager.show('newProduct');
        } else {
          views_manager.show('logIn');
        }
      });

      $('#my_products').click(function () {
        if (isLoggedIn) {
          getMyProducts()
            .then(function (json) {
              views_manager.show('clear');
              console.log('My JSON products:', json);
              renderListings(json.myProducts);
            });
        } else {
          views_manager.show('logIn');
        }
      });

      $('#messages').click(function () {
        if (isLoggedIn) {
          views_manager.show('messages');
        } else {
          views_manager.show('logIn');
        }
      });

    });
});


