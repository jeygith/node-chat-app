const path = require('path');

const publicPath = path.join(__dirname, '../public');

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var app = express();

var server = http.createServer(app);

var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey.. ssup?',
        createdAt: 123
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hey.. ssup?',
        createdAt: 123
    })

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    })
});


const port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log(`server started on port: ${port} `)
});

