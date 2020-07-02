// Initialize values
let $sidebar;
let categorySelected;

// Reset search if current category is clicked.

const applyCategoryLinks = function() {
  $('.category-list').click(function() {
    // Reset price filters
    $('#min_price').val('');
    $('#max_price').val('');

    const id = $(this).attr('id');
    const catID = id.slice(9,30);

    // Remove existing category filter if highlighted.
    $(`#category-${categorySelected}`).addClass('category-button-normal');
    $(`#category-${categorySelected}`).removeClass('category-button-selected');

    // So we can track the category selected for the price-filter.
    categorySelected = catID;

    // CSS to make it stay highlighted.
    $(this).removeClass('category-button-normal');
    $(this).addClass('category-button-selected');

    // Apply filter.
    getAllProducts(`category_id=${catID}`).then(function(json) {
      renderListings(json.products);
      applyCategoryLinks();
    });
  });


  $('#price-search-form').submit(function(event) {
    event.preventDefault();
    let data = $(this).serialize();

    if (categorySelected) {
      data += `&category_id=${categorySelected}`;
    }

    getAllProducts(data).then(function(json) {
      renderListings(json.products);
      applySearchFormHandler();
    });
  });
};

const renderSidebarCategory = function(category) {
  const markup = `
    <li id='category-${category.category_id}' class='category-list category-button-normal'>${category.category_name}</li>
  `;
  return markup;
};

const renderSidebar = function(categoryArray) {
  $sidebar = $(`
  <aside id="sidebar">
      <button id="filter-button" class="btn">Filter</button>
      <div id="all-filters-container">
        <form id="price-search-form">
          <label for="min_price"></label>
          <input type="text" id="min_price" name="min_price" class="apply-button" placeholder="$ Min">
          <p>-</p>
          <label for="max_price"></label>
          <input type="text" id="max_pice" name="max_price" class="apply-button" placeholder="$ Max">
          <button class="btn btn-primary apply-button">Apply</button>
        </form>
        <div class="categories-group horizontal-scrollable">
          <ul id="category-list">
          </ul>
        </div>
      </div>
    </aside>`);

  $('main').prepend($sidebar);

  for (const category of categoryArray) {
    const $category = renderSidebarCategory(category);
    $('#category-list').append($category);
  }

  applyCategoryLinks();

  $('#filter-button').click(function() {
    $("#all-filters-container").slideToggle("slow", function() {
    });
  });
};
