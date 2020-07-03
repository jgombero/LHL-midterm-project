
const $newProduct = $(`
<div><label for="add-product-form"><h1>Add a product!</h1></label></div>
<form id="add-product-form">
  <div class="form-group">
    <label for="title">Title</label>
    <input class="form-control" type="text" name="title" placeholder="Title" />
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Category</label>
    <select class="form-control" name="category" id="categories-list"></select>
  </div>
  <div class="form-group">
  <label for="description">Description</label>
    <textarea name="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>

  <div class="form-group row">
  <label for="price" class="col-sm-2 col-form-label">Price</label>
  <input type="number" name="price" step="any" placeholder="$" />
  </div>
  <div class="form-group">
  <label for="photo_url">Photo</label>
  <input type="text" class="form-control" name="photo_url" placeholder="Photo URL" />
  </div>
  <button type="submit" class="btn btn-primary mb-2">Add Listing</button
</form>
`);

const renderCategory = function(category) {
  const markup = `
  <option value="${category.category_id}">${category.category_name}</option>
  `;
  return markup;
};

const renderCategories = function(categoriesArray) {

  for (const category of categoriesArray) {
    const $cat = renderCategory(category);
    $newProduct.find('select').append($cat);
  }
};

getAllCategories()
.then(json => {
  // console.log(json.categories);
  renderCategories(json.categories);
});




$(() => {
  $newProduct.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    addProduct(data)
      .then(json => {
        // console.log('JSON:', json);
        getAllProducts().then(function(json) {
          // console.log('returned items from DB:', json);
          window.views_manager.show('product');
          renderListings(json.products);
          // location.reload();
          // $section = $('main');
          // $products = $('#main-container');

          // window.views_manager.show('product');
          console.log('After views manager triggered');
        });
      });
  });

});
