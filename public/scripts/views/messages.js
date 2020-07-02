// Set up to allow for data caching.
let messageData;

const updateMessages = function () {
  // GROUP BY message request
  getUniqueMessages().then(function (json) {
    // Render the subjects on the message page.
    renderMessageConversations(json.messages, json.userID);

    // Pull all message-related data, including multiple messages in a single conversation.
    getAllMessages().then(function (json) {
      // store all users messages in messageData.
      messageData = [json.messages, json['userID']];
    });
  });
};

const renderMessageConversations = function (messageArray, userID) {
  // Creates the subjects (left side of screen)

  // need to update this.
  if (messageArray.length === 0) {
    $messages = $(`There are no messages`);
  } else {
    // Base message HTML
    $messages = $(`
    <div id="messages-container">
      <div id="messages-list">
      </div>
      <div id="single-message-container">
      </div>
    </div>`);

    $messages.appendTo('main');

    // Creates the subjects (left side of screen) - Mentions either From or To -.
    for (const message of messageArray) {
      let messageSubject;
      if (message.from_user_id == userID) {
        messageSubject = $(`
        <article class="message-subject" from='${message.from_user_id}' to='${message.to_user_id}' product='${message.product_id}'>
          <img class="message-image" src="${message.photo_url}">
          <div class="message-subject-text">
          <p class="product-price"><strong>${message.name}</strong></p>
          <p class="product-name">To ${message.owner_name}</p>
          </div>
          </article>
      `);
      } else {
        messageSubject = $(`
        <article class="message-subject" from='${message.from_user_id}' to='${message.to_user_id}' product='${message.product_id}'>
        <img class="message-image" src="${message.photo_url}">
        <div class="message-subject-text">
          <p class="product-price"><strong>${message.name}</strong></p>
          <p class="product-name">From ${message.sender_name}</p>
        </div>
        </article>
      `);
      }
      $('#messages-list').append(messageSubject);
    }
  }

  // Apply on-click listener to load each conversation's data.
  $('.message-subject').click(function (event) {
    // Pull message-related data from HTML tags.
    const fromID = $(this).attr('from');
    const toID = $(this).attr('to');
    const productID = $(this).attr('product');
    $('#single-message-container').empty();
    renderConversationMessages(messageData, fromID, toID, productID);
  });
};

const renderConversationMessages = function (messageData, fromID, toID, productID) {
  // Checks all of a users messages that they are mentioned in. If The To/From/Product match, they are rendered to screen.
  const userID = messageData[1];
  const messages = messageData[0];
  const messageContainer = $('#single-message-container');
  console.log(fromID, toID, userID);

  for (const message of messages) {
    // Go through all messages user has sent or received. If product ID matches,
    // categorize message appropriately.
    if (productID == message.product_id) {
      if (userID == message.from_user_id && (message.to_user_id == fromID || message.to_user_id == toID)) {
        let messageContent = $(`
      <div class="message-content outgoing-container">
        <p class="outgoing-message">${message.message_text}</p>
      </div>
       `);
        messageContainer.append(messageContent);
      } else if (userID == message.to_user_id && message.from_user_id == fromID) {
        let messageContent = $(`
        <div class="message-content">
           <p class="incoming-message">${message.message_text}</p>
        </div>
        `);
        messageContainer.append(messageContent);
      }
    }
  }
  // After For loop is done, render in the send-message form.
  const $replyForm = $(`
 <form id="message-reply-form">
  <div class="message-reply-div">
    <input class="message-reply-input" type="text" name="message_text" placeholder="Reply">
      <button type-"submit" class="message-reply-button">
        Reply
      </button>
  </div>
  </form>
 `);
  messageContainer.append($replyForm);

  $('#message-reply-form').submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    data += `&from_user_id=${userID}&product_id=${productID}`;

    if (fromID == userID) {
      data += `&to_user_id=${toID}`;
    } else {
      data += `&to_user_id=${fromID}`;
    }
    // +FROM USER + PRODUCT ID
    sendMessage(data).then(function (json) {
      getAllMessages().then(function (json) {
        // store all users messages in messageData.
        messageData = [json.messages, json['userID']];

        $('#single-message-container').empty();
        // console.log(messageData, fromID, toID, productID)
        renderConversationMessages(messageData, fromID, toID, productID);

        // NOT DRY but putting this here to fix issue where it loaded olded messages.
        $('.message-subject').click(function (event) {
          // Pull message-related data from HTML tags.
          const fromID = $(this).attr('from');
          const toID = $(this).attr('to');
          const productID = $(this).attr('product');
          $('#single-message-container').empty();
          renderConversationMessages(messageData, fromID, toID, productID);
        });
      });
    });
  });

};
