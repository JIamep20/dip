var usersContainer = require('./usersContainer');

module.exports = function (socket) {
    socket.on('queryOnlineUsers', (request, callback) => {
        if (callback && request) {
            callback(request.map(id => {
                return {id: id, status: !!usersContainer._UserSockets[id]};
            }));
        }
    });
};