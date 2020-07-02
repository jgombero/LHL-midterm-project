const $searchbar = $(`
<form id="search-form">
  <div id="search-bar" class="buttonIn">
    <input type="text" id="search-bar-text" name="search_param" placeholder="Search all items...">
    <button id="clear-button">Clear</button>
</form>
`);

const renderSearchbar = function() {
  $searchbar.prependTo($('main'));
};


const applySearchFormHandler = function() {
  $('#search-form').submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    console.log('search data:', data);

    getAllProducts(data).then(function (json) {
      console.log('return val from SQL', json);
      renderListings(json.products);
    });
  });

  $('#clear-button').click(function (event) {
    event.preventDefault();

    console.log('clear button click');
    $(`li .category-list`).addClass('category-button-normal');
    $(`li .category-list`).removeClass('category-button-selected');
    $('#search-bar-text').val('');
    $('#min_price').val('');
    $('#max_price').val('');
    getAllProducts().then(function (json) {
      renderListings(json.products);
      applySearchFormHandler();
      // $('#clear-button').hide();
    });
  });
};

$(() => {
  applySearchFormHandler();
});

