$(() => {
  console.log('doc loaded');

 $('#test-form').submit(function (event) {
    event.preventDefault();
    console.log('test');

    const data = $(this).serialize();
    console.log('example data from form', data);
    sendMessage(data);
  });
});
