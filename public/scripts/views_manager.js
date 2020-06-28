$(() => {
 $('#test-form').on('submit', function (event) {
   event.preventDefault();

  const data = $(this).serialize();
  console.log('example data from form', data);
  sendMessage(data);
 });
});
