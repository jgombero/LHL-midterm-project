// Starting point for app.
let categoriesList;

$(() => {
  getAllCategories().then(function(json) {
    // console.log('JSON categories: ', json);
    categoriesList = json.categories;
    renderSearchbar();
    renderSidebar(json.categories);
    applySearchFormHandler();
  });

  getAllProducts().then(function(json) {
    // console.log('returned items from DB:', json.products);
    renderListings(json.products);
    // renderHeader();
  });
});


