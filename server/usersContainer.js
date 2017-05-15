var _ = require('lodash');

module.exports = new function () {
    this._UserSockets = {};
    this._SocketUser = {};

    this.add = function (userId, socketId, cb) {
        this._UserSockets[userId] !== undefined
            ? this._UserSockets[userId].push(socketId)
            : this._UserSockets[userId] = [socketId];

        this._SocketUser[socketId] = userId;
    };

    this.delete = function(userId) {
        delete this._UserSockets[this._SocketUser[userId]];
        delete this._SocketUser[userId];
    };
    this.remove = this.delete;

    this.getSocketIds = function(userId) {
        return this._UserSockets[userId] || [];
    };

    this.getUserSockets = function(userId) {
        return this._UserSockets[userId] || [];
    };

    this.getUserId = function(socketId) {
        return this._SocketUser[socketId];
    };
};