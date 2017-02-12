import io from 'socket.io-client';
import cookie from 'react-cookie';

export default new function () {
    this._socket = null;
    var self = this;
    this.connect = function () {
        return new Promise((resolve, reject) => {
            if(self._socket && self.logged) {return resolve(self._socket);}

            if(!self._socket) {self._socket = io('http://localhost:3000/');}
            self._socket.on('connect', () => {
                let s = self._socket;
                console.log('Socket connected');

                s.emit('authorize', {token: self._getCookie('x-access-token')});

                s.on('logged', () => {
                    self.logged = true;

                    s.on('user-status-changed', data => {
                        self._dispatch({type: 'SOCKET_USER_STATUS_CHANGE', payload: data});
                    });

                    return resolve(s);
                });

                s.on('disconnect', () => {
                    self.logged = false;
                    return reject(s);
                });
                self._socket.on('connect_error', () => {
                    self.logged = false;
                    return reject(s);
                });
                self._socket.on('error', () => {
                    self.logged = false;
                    return reject(s);
                });
                self._socket.on('disconnect', () => {
                    self.logged = false;
                    return reject(s);
                });
            });
        });
    };

    this.emit = (event, data) => {
        return this.connect().then(socket => {
            return new Promise((resolve, reject) => {
                //if (!this._socket) return reject('No socket connection.');

                return socket.emit(event, data, (response) => {
                    // Response is the optional callback that you can use with socket.io in every request. See 1 above.
                    if (response) {
                        if (response.error) {
                            console.error(response.error);
                            return reject(response.error);
                        }
                        return resolve(response);
                    }

                    return resolve();
                });
            });
        });
    };

    this.disconnect = function () {
        if (this._socket.connected) {
            this._socket.disconnect();
        }
        self.logged = false;
        this._socket = null;
    };

    this._getCookie = function (name) {
        return cookie.load(name);
        // var value = "; " + document.cookie;
        // var parts = value.split("; " + name + "=");
        // if (parts.length == 2) return parts.pop().split(";").shift();

    };

    this.configurateStore = ({dispatch, getState}) => {
        self._dispatch = dispatch;
        self._getState = getState;
    };
}