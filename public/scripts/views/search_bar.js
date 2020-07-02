const $searchbar = $(`
<form id="search-form">
  <div id="search-bar" class="buttonIn">
    <input type="text" id="search-bar-text" name="search_param" placeholder="Search all items...">
    <button id="clear">Clear</button>
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
