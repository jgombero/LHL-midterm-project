const applyCategoryLinks = function() {
  $('.category-list').click(function() {
    const id = $(this).attr('id');
    const catName = id.slice(9,30);
    getAllProducts(`category_name=${catName}`).then(function(json) {
      renderListings(json.products);
    });
  });
};

const renderSidebarCategory = function(categoryName) {
  const markup = `
    <li id='category-${categoryName}' class='category-list'>${categoryName}</li>
  `;
  return markup;
};

let $sidebar;

const renderSidebar = function(categoryArray) {
  $sidebar = `
  <aside id="sidebar">
      <button id="filter-button" class="btn btn-success">Filter</button>
      <div id="all-filters-container">
        <form id="price-search-form">
          <label for="min_price"></label>
          <input type="text" name="min_price" class="apply-button" placeholder="$ Min">
          <p>-</p>
          <label for="max_price"></label>
          <input type="text" name="max_price" class="apply-button" placeholder="$ Max">
          <button class="btn btn-primary apply-button">Apply</button>
        </form>
        <div class="categories-group horizontal-scrollable">
          <ul id="category-list">
          </ul>
        </div>
      </div>
    </aside>`;

  $('main').prepend($sidebar);

  for (const category of categoryArray) {
    const $category = renderSidebarCategory(category.category_name);
    $('#category-list').append($category);
  }

  applyCategoryLinks();

  $('#filter-button').click(function() {
    $("#all-filters-container").slideToggle("slow", function() {
    });
  });

};
