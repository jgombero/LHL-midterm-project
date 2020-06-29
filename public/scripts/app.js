// Starting point for app.
$(() => {
  console.log('page loaded. Running get to /product/s');
  getAllProducts().then(function(json) {
    // console.log('returned items from DB:', json.products);
    renderListings(json.products);
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


