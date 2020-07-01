const $searchbar = $(`
<form id="search-form">
  <div id="search-bar">
    <input type="text" id="search-bar-text" name="search-text" placeholder="Search all items...">
</form>
`);

$(() => {
  console.log('search-bar.js loaded');
  $searchbar.prependTo($('main'));
});
