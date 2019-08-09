var socket = io();
socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey. this is Jeff'
    })

    socket.emit('createMessage', {
        to: 'jen@example.com',
        text: 'Hey. this is Jeff'
    })
})

socket.on('disconnect', () => {
    console.log('disconnected from server')
});


socket.on('newEmail', (email) => {
    console.log('New email', email);
});

socket.on('newMessage', (message) => {
    console.log('newMessage', message);
})