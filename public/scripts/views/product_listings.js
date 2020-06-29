const renderListing = function(listingObj) {
  const markup = `
  <article class="product">
    <img src="${listingObj.photo_url}" alt="" class="product-image">
    <p class="product-text">${listingObj.description}</p>
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
