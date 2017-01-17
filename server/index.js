//var app = require('express')();
//var server = require('http').Server(app);
var io = require('socket.io');
var Redis = require('ioredis');
var redis = new Redis();
//server.listen(3000);

//.get('/', function (request, response) {
//    response.send('hi');
//});
console.log(123);
redis.subscribe('test-channel', function (err, count) {});

io = io.listen(3000);

io.on('connection', function (socket) {
    console.log('A connection was made');
});

redis.on('message', function(channel, message) {
    io.emit('channel:event', message);
});

redis.on("error", function(err){
    //console.log(err);
});