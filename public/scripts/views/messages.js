let $messages = $('No Messages');

const updateMessages = function() {
  // GROUP BY message request
  getAllMessages().then(function(json) {
    renderMessageConversations(json.messages);
  });
};

const renderMessageConversations = function(messageArray) {
  // Some sort of different render if no messages in array.
  if (messageArray.length === 0) {
    $messages = $(`There are no messages`);
  } else {
    for (const message in messageArray) {
      console.log(message);
      $(`
      <article class="message-subject">
        <img class="message-image" src="https://i.imgur.com/NGJjoTA.jpg">
        Test Subject
      </article>
    `);
    }

    // append to Message List

    $messages = $(`<div id="messages-container">
    <div id="messages-list">


    </div>
    <div id="single-message-container">
      <div class="message-content">
        <p class="incoming-message">Test message content. This is an even logner version. This is an even logner
          version. This is an even logner vers</p>
      </div>

      <div class="message-content">
        <p class="incoming-message">Test message content</p>

      </div>

    </div>
    </div>`);

  }
};

const renderConversationMessages = function(messageArray) {



  for (const message in messageArray) {
    const message = $(`
    <div class="message-content">
       <p class="incoming-message">Test message content. This is an even logner version. This is an even logner
       version. This is an even logner vers</p>
    </div>
    `);

    // OR

    const message = $(`
    <div class="message-content outgoing-container">
        <p class="outgoing-message">Test message content. This is an even
          logner version. This is an even
          logner version. This is an even
          logner version.
        </p>
      </div>
    `)

    // APPEnd to #singleMessageContainer
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

