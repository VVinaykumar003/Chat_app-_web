const  johnSelectorBtn = document.querySelector('#john-selector');
const  janeSelectorBtn = document.querySelector('#jane-selector');
const chaterHeader = document.querySelector('.chat-header');
const chaterMessages = document.querySelector('.chat-message');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

// fetching messages form local storage
const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChaterMessageElement = (message)=>`
      <div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
      </div>`


window.onload =()=> {
  messages.forEach((message)=>{
    chaterMessages.innerHTML += createChaterMessageElement(message);
  })
}

let messageSender = 'John';

      const updaeeMessageSender = (name )=> {
        messageSender = name
        chaterHeader.innerText = `${messageSender} chatting....`
        chatInput.placeholder = `Type here ,${messageSender}`

        if(name === 'John'){
          johnSelectorBtn.classList.add('active-person');
          janeSelectorBtn.classList.remove('active-person');
        }

        if(name === 'Jane'){
          johnSelectorBtn.classList.remove('active-person');
          janeSelectorBtn.classList.add('active-person');
        }
        chatInput.focus()
      }
johnSelectorBtn.onclick = () => updaeeMessageSender('John');
janeSelectorBtn.onclick = () => updaeeMessageSender('Jane');

// message sender
      const sendMessage = (e) => {
        e.preventDefault()
        const timestamp = new Date().toLocaleString('en-US',{hour:'numeric',minute: 'numeric' ,hour12:true})

        const message = {
          sender : messageSender,
          text : chatInput.value,
          timestamp,
          
        }
        messages.push(message)
        localStorage.setItem('messgaes',JSON.stringify(message))
        chaterMessages.innerHTML += createChaterMessageElement(message);
        chatInputForm.reset();
        chaterMessages.scrollTop = chaterMessages.scrollHeight;
      }

      chatInputForm.addEventListener('submit',sendMessage);
      
      clearChatBtn.addEventListener('click' , ()=>{
        localStorage.clear()
        chaterMessages.innerHTML =''
      })