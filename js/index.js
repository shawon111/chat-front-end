// console.log('hello world')
const socket = io('http://localhost:7000');

const form = document.getElementById('send-form');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('conatiner');
const notificationSound = new Audio('../ting1.mp3');

const AppendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        notificationSound.play();
    }
    
};

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    AppendMessage(`you: ${message}`, 'right');
    socket.emit('send-message', message);
    messageInput.value = '';
});

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    const joinedNotification = `${name} joined the chat`;
    const notificationPosition = 'left';
    AppendMessage(joinedNotification, notificationPosition)
})

socket.on('message-recieved', data=>{
    const message = data.message;
    const name = data.name;
   AppendMessage(`${name}: ${message}`, 'left')
})
socket.on('leave', name=>{
   AppendMessage(`${name} left the chat`, 'left')
})