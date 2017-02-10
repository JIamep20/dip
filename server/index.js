var config = require('./config');
var io = require('socket.io');
var Redis = require('ioredis');
var redis = new Redis();

var users = require('./usersContainer');
var checkAuth = require('./checkAuth');

console.log("Starting sockets server...");

io = io.listen(config.socketPort || 3000);
console.log('Socket server listens on socket: ' + config.socketPort);

try {
    redis.subscribe('general', function (err, count) {
    });

    console.log('Subscribed to general channel');
} catch (e) {
    console.log('Error happened while subscribing to general channel');
    console.log(e.message);
}

redis.on('message', function (channel, message) {
    var message = JSON.parse(message);
    if (channel == 'general') {

    } else {
        id = parseInt(channel.split('-')[1]);
        
        if (!!users.getUserSockets(id)) {
            users.getUserSockets(id).forEach(function (item) {
                io.sockets.sockets[item].emit('ne', {channel, data: message.data, event: message.event});
            });
        }
    }
});

io.on('connection', function (socket) {
    console.log('New user connected');
    socket.on('authorize', function (loginData) {
        if (!!loginData.token) {
            checkAuth(loginData, function (error, user) {
                if(error) {
                    socket.disconnect();
                    return;
                }
                console.log('user id: ' + user.id + " authorized");
                users.add(user.id, socket.id);
                socket.emit('logged', {payload: true});
                redis.subscribe('private-' + user.id);
                socket.on('disconnect', function () {
                    console.log('user id: ' + user.id + ' disconnected');
                    redis.unsubscribe('private-' + user.id);
                    users.delete(socket.id);
                });
            });
        } else {
            socket.on('disconnect', function () {
                console.log('Anauthorized socket disconnected');
            });
        }
    });
});
