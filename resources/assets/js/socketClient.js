import io from 'socket.io-client';
import cookie from 'react-cookie';

import * as friendsAction from './constants/friendshipsActionsConst';
import * as groupsAction from './constants/groupsActionsConst';
import * as usersAction from './constants/usersActionsConst';

import { SOCKET_FRIEND_STATUS_CHANGE, queryOnlineUsers } from './actions/friendsActions';

export default new function () {
    this._socket = null;
    const self = this;
    this.connect = function () {
        if(self._socket) return self._socket;

        return self._socket = new Promise((resolve, reject) => {
            let s = io('http://localhost:3000/');

            s.on('connect', () => {
                console.log('Socket connected');

                s.emit('authorize', {token: self._getCookie('x-access-token')});

                s.on('logged', () => {
                    this.registerSocketEvents(s);

                    return resolve(s);
                });
                
                s.on('reconnect', () => {
                    self._dispatch(queryOnlineUsers());
                });

                s.on('disconnect', () => {
                    s.connect();
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

    this.registerSocketEvents = (s) => {
        s.on('userStatusUpdated', data => {
            self._dispatch({type: SOCKET_FRIEND_STATUS_CHANGE, payload: data});
        });

        s.on('ne', m => {
            const { friend, message, group, user, users } = m.data;
            switch (m.event){
                case 'App\\Events\\FriendshipMessageEvent':
                    message.user = friend;
                    this._dispatch({type: friendsAction.createFriendMessageSuccess, payload: {id: friend.id, res: message}});
                    break;
                case 'App\\Events\\FriendshipDeletedEvent':
                    this._dispatch({type: friendsAction.deleteUserFromFriendsSuccess, payload: friend});
                    break;
                case 'App\\Events\\FriendshipCreatedEvent':
                    this._dispatch({type: usersAction.addUserToFriendsByIdSuccess, payload: friend});
                    break;

                case 'App\\Events\\UserAddedToGroupEvent':
                        this._dispatch({type: groupsAction.addUserToGroupSuccess, payload: {id: group.id, res: user}});
                    break;
                case 'App\\Events\\UserLeavesGroupEvent':
                    this._dispatch({type: groupsAction.socket_userLeftGroupNotification, payload: {user, group}});
                    break;
                case 'App\\Events\\AddedToGroupNotificationEvent':
                    this._dispatch({type: groupsAction.socket_addedToGroupNotification, payload: {group, users}});
                    break;
                case 'App\\Events\\GroupMessageEvent':
                    this._dispatch({type: groupsAction.createGroupMessageSuccess, payload: {id: group.id, res: message}});
                    break;
            }
        });
    }
};