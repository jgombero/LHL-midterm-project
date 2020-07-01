// Starting point for app.
$(() => {
  getAllCategories().then(function(json) {
    // console.log('JSON categories: ', json);
    renderSidebar(json.categories);
  });

  getAllProducts().then(function(json) {
    // console.log('returned items from DB:', json.products);
    renderListings(json.products);
    // renderHeader();
  });
});


