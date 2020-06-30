const renderListing = function(listingObj) {
  console.log('listing obj: ', listingObj);
  const markup = `
  <article class="product" id="product-${listingObj.id}">
    <img src="${listingObj.photo_url}" alt="" class="product-image">
    <div class="product-text">
      <p class="product-name">${listingObj.name}</p>
      <p class="product-price">${listingObj.price}</p>
    </div>
  </article>
  `;
  return markup;
};

const renderListings = function(productListingsArray) {
  $('#products').empty();

  for (const listing of productListingsArray) {

    const $listing = renderListing(listing);

    $('#products').append($listing);

  }
  applyPopups();
};

// let renderListings = (productListingsArray) => {
//   console.log(productListingsArray);

// };

// $(() => {


// });
