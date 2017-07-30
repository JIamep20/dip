import io from 'socket.io-client';
import cookie from 'react-cookie';
import { push } from 'react-router-redux';

import socketServerConfig from '../../../server/config';

import { refreshApp } from './actions/commonActions';

import * as friendsAction from './constants/friendshipsActionsConst';

export default new function () {
    this._socket = null;
    const self = this;
    this.connect = function () {
        if(self._socket) return self._socket;

        return self._socket = new Promise((resolve, reject) => {
            let s = io(`${socketServerConfig.socketProtocol}${socketServerConfig.socketHost}`, {query: `token=${self._getCookie()}`});

            s.on('connect_error', () => {
                return reject(s);
            });

            s.on('connect', () => {
                self.registerSocketEvents(s);
                
                s.on('disconnect', () => {
                    s.connect();
                });

                s.on('reconnect', () => {
                    self._dispatch(refreshApp());
                });

                return resolve(s);
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

    this._getCookie = function (name = 'x-access-token') {
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
            self._dispatch({type: friendsAction.socket_userStatusChanged, payload: data});
        });

        /*s.on('ne', m => {
            const { friend, message, group, user, users } = m.data;
            switch (m.event){
                case 'App\\Events\\FriendshipMessageEvent':
                    message.user = friend;
                    this._dispatch({type: friendsAction.createFriendMessageSuccess, payload: {id: friend.id, res: message}});
                    break;
                case 'App\\Events\\FriendshipDeletedEvent':
                    this._dispatch({type: friendsAction.deleteUserFromFriendsSuccess, payload: friend});
                    console.log(this._getState());
                    if (this._getState().routing.locationBeforeTransitions.pathname == `/friend/${friend.id}`) {
                        this._dispatch(push('/'));
                    }
                    break;
                case 'App\\Events\\FriendshipCreatedEvent':
                    this._dispatch(friendshipCreated(friend));
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
        });*/
    };

    this.resetSocket = () => {
        this._socket = null;
    };
};