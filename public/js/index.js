var socket = io();
socket.on('connect', () => {
    console.log('connected to server');

});

socket.on('disconnect', () => {
    console.log('disconnected from server')
});

socket.on('newMessage', (message) => {
    console.log('newMessage', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

/*
socket.emit('createMessage', {
    from: 'Jane',
    text: 'Hi fellas!'
},  function(data){
    console.log('got it', data)
});
*/

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    })
})