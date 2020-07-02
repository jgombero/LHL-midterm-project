// let $products;
let $window;

let applyPopups = () => {
  // Applies click handler for all product images
  $('.product').click(function() {
    const id = $(this).attr('id');
    // Take ID for product and generates popup details.
    $window.generatePopup(id);
    $('.product').unbind();
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
