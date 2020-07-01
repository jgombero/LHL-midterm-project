// Starting point for app.
let categoriesList;

$(() => {
  getAllCategories().then(function(json) {
    // console.log('JSON categories: ', json);
    categoriesList = json.categories;
    renderSidebar(json.categories);
  });

  getAllProducts().then(function(json) {
    // console.log('returned items from DB:', json.products);
    renderListings(json.products);
    // renderHeader();
  });
});


