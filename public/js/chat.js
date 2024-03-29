var socket = io();

function scrollToBottom() {
    // selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    console.log('connected to server');

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }

    });

});

socket.on('updateUserList', function(users){
   console.log('Users List', users);
   var ol = jQuery('<ol></ol>');

   users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
   });

   jQuery('#users').html(ol);

});

socket.on('disconnect', () => {
    console.log('disconnected from server')
});

socket.on('newMessage', (message) => {

    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    /*console.log('newMessage', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);*/


});

socket.on('newLocationMessage', function (message) {
    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    /*console.log(message);
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);

    li.append(a);

    jQuery('#messages').append(li);*/
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
