const $searchbar = $(`
<form id="search-form">
  <div id="search-bar" class="buttonIn">
    <input type="text" id="search-bar-text" name="search_param" placeholder="Search all items...">
    <button id="clear-button">Clear</button>
</form>
`);

const applySearchFormHandler = function() {
  $('#search-form').submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    $('#clear-button').show();
    $('#search-bar-text').val('');


    $('#clear-button').click(function () {
      getAllProducts().then(function (json) {
        renderListings(json.products);
        $('#clear-button').hide();
      });
    });
    console.log(data);

    getAllProducts(data).then(function (json) {
      console.log('return val from SQL', json);
      renderListings(json.products);
    });
  });
}

$(() => {
  // console.log('search-bar.js loaded');
});

const renderSearchbar = function() {
  $searchbar.prependTo($('main'));
};
