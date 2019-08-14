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

socket.on('newLocationMessage', function (message) {
    console.log(message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);

    jQuery('#messages').append(li);
})

/*
socket.emit('createMessage', {
    from: 'Jane',
    text: 'Hi fellas!'
},  function(data){
    console.log('got it', data)
});
*/

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    })
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (e) {
    console.log('clicked');

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')

    }

    locationButton.attr('disabled', 'disabled').text('Sending location....');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function (err) {
        console.log(err);
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.')
    });
});
