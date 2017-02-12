var usersContainer = require('./usersContainer');

module.exports = function (socket) {
    socket.on('queryOnlineUsers', (request, callback) => {
        if (callback) {
            callback(request.map(item => {
                return {id: item.id, status: !!usersContainer._UserSockets[item.id]};
            }));
        }
    });
};