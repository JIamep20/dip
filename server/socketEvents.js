var usersContainer = require('./usersContainer');

module.exports = function (socket, socketUserId) {
    socket.on('friendshipSynchronization', (request, callback) => {
        if (callback && request) { console.log(request);
            callback(request.filter(({friendId}) => !!usersContainer._UserSockets[friendId]));
        }
    });

    socket.on('offer', (data) => {
        let conn = usersContainer.getUserSockets(data.id);
        conn.forEach((item) => item.emit('offer', {data: data.offer, id: data.id}));
    });

    socket.on('answer', (data) => {
        let conn = usersContainer.getUserSockets(data.id);
        conn.forEach(item => item.emit('answer', {data: data.answer, id: data.id}));
    });

    socket.on('candidate', (data) => {
        let conn = usersContainer.getUserSockets(data.id);
        conn.forEach(item => item.emit('candidate', {data: data.candidate, id: data.id}));
    });

    socket.on('leave', (data) => {
        let conn = usersContainer.getUserSockets(data.id);
        conn.forEach(item => item.emit('leave', {id: usersContainer.getUserId(socket.id)}));
    });
};