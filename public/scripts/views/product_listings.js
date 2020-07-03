// let $products;
let $window;

let applyPopups = () => {
  getMyDetails()
  .then(json => {
  let isLoggedIn = false;

    if (json.user) {
      isLoggedIn = true;
    }

    // Applies click handler for all product images
    $('.product').click(function() {
      if (isLoggedIn) {
      const id = $(this).attr('id');
      // Take ID for product and generates popup details.
      $window.generatePopup(id);
      $('.product').unbind();
      } else {
        views_manager.show('logIn');
      }
    });
  });
};

const renderListing = function(listingObj) {
  // console.log('listing obj: ', listingObj);
  let markup;
  if (listingObj.available) {
    markup = `
    <article class="product" id="product-${listingObj.id}">
      <img src="${listingObj.photo_url}" alt="" class="product-image">
      <div class="product-text">
        <p class="product-name">${listingObj.name}</p>
        <p class="product-price"><strong>$${(listingObj.price / 100).toFixed(2)}</strong></p>
      </div>
    </article>
    `;
  } else {
    markup = `
    <article class="product sold" id="product-${listingObj.id}">
      <img src="${listingObj.photo_url}" alt="" class="product-image">
      <div class="product-text">
        <p class="product-name">${listingObj.name}</p>
        <p class="product-price"><strong>SOLD!</strong></p>
      </div>
    </article>
    `;
  }
  return markup;
};

const renderListings = function(productListingsArray) {
  $('#main-container').empty();

  for (const listing of productListingsArray) {
    const $listing = renderListing(listing);

    $('#main-container').append($listing);

  }
  applyPopups();
};

let pageNum = 1;

// Math.floor(document.height / window.height)
//   = pageNum

$(window).scroll(function() {
  if($(window).scrollTop() == $(document).height() - $(window).height()) {
    console.log('DOCUMENT HEIGHT:', $(document).height());
    console.log('WINDOW HEIGHT:', $(window).height());
    getAllProducts(`pageNum=${pageNum}`)
    .then(function(json) {
      console.log(json);
      addListingsOnScroll(json.products);
      pageNum += 1;
    });
  }
});

const addListingsOnScroll = function(productListingsArray) {

  for (const listing of productListingsArray) {
    const $listing = renderListing(listing);

    $('#main-container').append($listing);

  }
  applyPopups();
};
