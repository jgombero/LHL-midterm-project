// Starting point for app.
$(() => {
  console.log('page loaded. Running get to /product/s');
  getAllCategories().then(function(json) {
    // console.log('JSON categories: ', json);
    renderSidebar(json.categories);
  });

  getAllProducts().then(function(json) {
    // console.log('returned items from DB:', json.products);
    renderListings(json.products);
    // renderHeader();
  });


  // $.ajax({
  //   method: "GET",
  //   url: "/api/products"
  // }).done((products) => {
  //   console.log('data returned from /api/products', products);
  //   // for(user of users) {
  //   //   $("<div>").text(user.name).appendTo($("body"));
  //   // }
  // });
});


