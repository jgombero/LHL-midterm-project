let $messages = $('No Messages');

let messageData;

const updateMessages = function() {
  // GROUP BY message request
  getAllMessages().then(function(json) {
    renderMessageConversations(json.messages, json.userID);
  });
};

const renderMessageConversations = function(messageArray, userID) {
  // Some sort of different render if no messages in array.
  messageData = [messageArray, userID];
  if (messageArray.length === 0) {
    $messages = $(`There are no messages`);
  } else {
    $messages = $(`
    <div id="messages-container">
      <div id="messages-list">
      </div>
      <div id="single-message-container">
      K
      </div>
    </div>`);

    $messages.appendTo('main');

    for (const message of messageArray) {
      console.log(message);
      console.log(userID);
      let messageSubject;
      if (message.from_user_id === userID) {
        messageSubject = $(`
        <article class="message-subject" id='message-${message.message_id}'>
          <img class="message-image" src="${message.photo_url}">
          ${message.name} - To ${message.owner_name}
        </article>
      `);
      } else {
        messageSubject = $(`
        <article class="message-subject" id='message-${message.message_id}'>
          <img class="message-image" src="${message.photo_url}">
          ${message.name} - From ${message.sender_name}
        </article>
      `);
      }
      $('#messages-list').append(messageSubject);
    }
  }

  $('.message-subject').click(function(event) {
    console.log($(this).attr('id'));
    const messageID = $(this).attr('id').slice(8,20);
    // $('#single-message-container').empty();
    renderConversationMessages(messageData);
  });
};

const renderConversationMessages = function(messageData) {
  const userID = messageData[1];
  const messages = messageData[0];
  const messageContainer = $('#single-message-container');
  for (const message of messages) {
    console.log(message.message_text);
    console.log('USER ID', userID);
    console.log('FROM USER ID', message.from_user_id);
    console.log('OWNER ID', message.owner_id);
    let messageContent;
    if (message.from_user_id === userID) {
      messageContent = $(`
      <div class="message-content">
         <p class="incoming-message">${message.message_text}</p>
      </div>
      `);

      messageContainer.append(messageContent);
    } else if (message.owner_id === userID) {
      messageContent = $(`
      <div class="message-content outgoing-container">
        <p class="outgoing-message">${message.message_text}</p>
      </div>
      `);
      messageContainer.append(messageContent);
    }
  }
};

// $messages = $(`<div id="messages-container">
//     <div id="messages-list">
//       <article class="message-subject">
//         <img class="message-image" src="https://i.imgur.com/NGJjoTA.jpg">
//         Test Subject
//       </article>
//       <article class="message-subject">Test Subject</article>


//       <article class="message-subject">Test Subject</article>
//       <article class="message-subject">Test Subject</article>
//       <article class="message-subject">Test Subject</article>

//     </div>
//     <div id="single-message-container">
//       <div class="message-content">
//         <p class="incoming-message">Test message content. This is an even logner version. This is an even logner
//           version. This is an even logner vers</p>
//       </div>
//       <div class="message-content outgoing-container">
//         <p class="outgoing-message">Test message content. This is an even
//           logner version. This is an even
//           logner version. This is an even
//           logner version.
//         </p>

//       </div>
//       <div class="message-content">
//         <p class="incoming-message">Test message content</p>

//       </div>

//     </div>
//     </div>`);

