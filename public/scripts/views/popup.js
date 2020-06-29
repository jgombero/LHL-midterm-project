let $window;

$(() => {
  $window = $('window');
  console.log('popup file run');
  $window.generatePopup = () => {
    let $popup = $(`<div id='popup' class='popup'>
    <article class="inner-product-box product-detail-box">
      <div class='inner-product-header'>
        <span class="close">&times;</span>
      </div>
      <img src="https://i.imgur.com/hqPLDXs.jpg" alt="" class="product-image">
      <div class="inner-product-datails">
        <h3>Sample Item Title here.</h3>
        <p class="inner-product-description">Sample Item Descriptive text. Sample Item Descriptive text. Sample Item
          Descriptive text. Sample Item Descriptive text.
          Sample Item Descriptive text. Sample Item Descriptive text. Sample Item Descriptive text.
        </p>
        <div class="inner-product-footer">
          <h3>$20,000</h3>
          <span class="close">&hearts;</span>
        </div>
        <form id="send-message-form">
           <div class="inner-product-footer">
            <label for="message-box"></label>
            <input id="message-box" type="text" name="send_message_text" placeholder="Is this product still available?">
            <button id="submit-message-button" type="submit">Send</button>
          </div>
        </form>
      </div>
    </article>
  </div>`);

  $window.popup = $popup

  }

});
