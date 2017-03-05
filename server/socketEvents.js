var usersContainer = require('./usersContainer');

module.exports = function (socket) {
    socket.on('queryOnlineUsers', (request, callback) => {
        if (callback) {
            callback(request.map(id => {
                return {id: id, status: !!usersContainer._UserSockets[id]};
            }));
        }
    });
};