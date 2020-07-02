const $searchbar = $(`
<form id="search-form">
  <div id="search-bar">
    <input type="text" id="search-bar-text" name="search_param" placeholder="Search all items...">
</form>
`);

$(() => {
  console.log('search-bar.js loaded');
  $searchbar.prependTo($('main'));

  $('#search-form').submit(function(event) {
    event.preventDefault();
    let data = $(this).serialize();

    console.log(data);

    getAllProducts(data).then(function(json) {
      console.log('return val from SQL', json);
      renderListings(json.products);
    });


  });
});
