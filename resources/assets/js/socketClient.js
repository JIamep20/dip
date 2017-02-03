import io from 'socket.io-client';
import cookie from 'react-cookie';

export default new function () {
    this._socket = null;
    var self = this;
    this.connect = function() {
        this._socket = io('http://localhost:3000/');

        var s = this._socket;

        s.on('connect', function() {
            console.log('Socket connected');

            s.emit('authorize', {token: self._getCookie('x-access-token')});

            s.on('ne', function(message) {
                console.log(message);
            });
        });
    };

    this.disconnect = function() {
        if(this._socket && this._socket.connected) {
            this._socket.disconnect();
            this._socket = null;
        }
    };

    this._getCookie = function(name) {
        return cookie.load(name);
        // var value = "; " + document.cookie;
        // var parts = value.split("; " + name + "=");
        // if (parts.length == 2) return parts.pop().split(";").shift();

    }
}