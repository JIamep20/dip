import io from 'socket.io-client';
import cookie from 'react-cookie';

import { SOCKET_FRIEND_STATUS_CHANGE, queryOnlineUsers } from './actions/friendsActions';

export default new function () {
    this._socket = null;
    var self = this;
    this.connect = function () {
        if(self._socket) return self._socket;

        return self._socket = new Promise((resolve, reject) => {
            let s = io('http://localhost:3000/');

            s.on('connect', () => {
                console.log('Socket connected');

                s.emit('authorize', {token: self._getCookie('x-access-token')});

                s.on('logged', () => {
                    s.on('user-status-changed', data => {
                        self._dispatch({type: SOCKET_FRIEND_STATUS_CHANGE, payload: data});
                    });

                    return resolve(s);
                });
                
                s.on('reconnect', () => {
                    self._dispatch(queryOnlineUsers());
                });

                s.on('disconnect', () => {
                    return reject(s);
                });
                s.on('connect_error', () => {
                    return reject(s);
                });
                s.on('error', () => {
                    return reject(s);
                });
                s.on('disconnect', () => {
                    return reject(s);
                });
            });
        });
        /*return new Promise((resolve, reject) => {
            if(self._socket && self.logged) {return resolve(self._socket);}

            if(!self._socket) {self._socket = io('http://localhost:3000/');}
            self._socket.on('connect', () => {
                let s = self._socket;
                console.log('Socket connected');

                s.emit('authorize', {token: self._getCookie('x-access-token')});

                s.on('logged', () => {
                    self.logged = true;

                    s.on('user-status-changed', data => {
                        self._dispatch({type: SOCKET_FRIEND_STATUS_CHANGE, payload: data});
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
        });*/
    };

    this.emit = (event, data) => {
        return this.connect().then(socket => {
            return new Promise((resolve, reject) => {
                return socket.emit(event, data, (response) => {
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
        })
            .catch(error => console.log('error in socketClient: ', error));
    };

    this.disconnect = function () {
        if (this._socket.connected) {
            this._socket.disconnect();
        }
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