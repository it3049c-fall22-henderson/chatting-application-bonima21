const nameInput = document.getElementById("myName");
const myMessage = document.getElementById("myMessage");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chat");
const request = new XMLHttpRequest();
const preElement = document.getElementById(`result`);

async function updateMessages() {
  const messages = await fetchMessages();
  let formattedMessages = "";
  messages.forEach((message) => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
  console.log(messages);
}

const serverURL = "https://it3049c-chat-application.herokuapp.com/messages";
function fetchMessages() {
  return fetch(serverURL).then((Response) => Response.json());
}
function formatMessage(message, myName) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myName === message.sender) {
    return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `;
  } else {
    return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `;
  }
}
function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date(),
  };
  fetch(serverURL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  });
}

sendButton.addEventListener("click", function (sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender, message);
  myMessage.value = "";
});
const saveNameButton = document.getElementById('save-name');
const messageInput = document.getElementById('messageInput');

saveNameButton.addEventListener("click", function() {
    localStorage.setItem('name', nameInput.value);
});
setInterval(function() {
  if (!localStorage.getItem('name')){
      messageInput.classList.add('d-none');
  } else {
      messageInput.classList.remove('d-none');
  }
}, 100);
