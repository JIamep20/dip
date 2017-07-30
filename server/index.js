var config = require('./config');
var io = require('socket.io');
var Redis = require('ioredis');
var redis = new Redis();

var _ = require('lodash');

var socketEvents = require('./socketEvents');
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
    message = JSON.parse(message);
    if (channel == 'general') {

    } else {
        id = parseInt(channel);

        if (!!users.getUserSockets(id)) {
            users.getUserSockets(id).forEach(function (item) {
                io.sockets.sockets[item].emit('ne', {channel, data: message.data, event: message.event});
            });
        }
    }
});

io.use(function (socket, next) {
    var token = _.get(socket, 'handshake.query.token', false);
    checkAuth(token, function (error, user) {
        if (error) {
            return next(new Error(error));
        }
        socket._parsedUser = user;
        next();
    });
});

io.on('connection', function (socket) {
    var user = socket._parsedUser;
    delete socket._parsedUser;

    console.log(`User (id: ${user.id}) connected.`);

    users.add(user.id, socket.id);
    socket.broadcast.emit('userStatusUpdated', {id: user.id, status: true});
    redis.subscribe(user.id);
    socketEvents(socket, user.id);

    socket.on('disconnect', function () {
        console.log(`User (id: ${user.id}) disconnected.`);
        redis.unsubscribe(user.id);
        socket.broadcast.emit('userStatusUpdated', {id: user.id, status: false});
        users.delete(socket.id);
    });
});
