import * as types from '../constants/friendshipsActionsConst';
import FriendsService from '../services/friend.service';
import { hashHistory } from 'react-router';
import SocketClient from '../socketClient';
import _ from 'lodash';
import { push } from 'react-router-redux';

export function fetchFriendships() {
    return function(dispatch) {
        dispatch({type: types.getFriendsRequest});
        return FriendsService.getFriends()
            .then(res => {
                dispatch({type: types.getFriendsSuccess, payload: res.data.data});
                dispatch(socket_queryOnlineUsers(_.map(res.data.data, 'id')));
            })
            .catch(error => dispatch({type: types.getFriendsError, payload: error}));
    }
}

export function loadFriendMessages(id) {
    return (dispatch, getStore) => {
        if(!getStore().friendsReducer['isLoadingMessages'][id] && !getStore().friendsReducer['messages'][id]) {
            dispatch({type: types.loadFriendMessagesRequest, payload: {id}});
            FriendsService.loadFriendMessages(id)
                .then(res => dispatch({type: types.loadFriendMessagesSuccess, payload: {res: res.data.data, id}}))
                .catch(error => {
                    dispatch({type: types.loadFriendMessagesError, payload: {error, id}});
                    dispatch(push('/'));
                    });
        }
    };
}

export function createFriendMessage(id, text) {
    return (dispatch, getState) => {
        dispatch({type: types.createFriendMessageRequest});
        FriendsService.createFriendMessage(id, text)
            .then(res => dispatch({type: types.createFriendMessageSuccess, payload: {id, res: res.data.data}}))
            .catch(error => dispatch({type: types.createFriendMessageError, payload: error}));
    }
}

export function deleteFriend(id) {
    return (dispatch) => {
        dispatch({type: types.deleteUserFromFriendsRequest});
        FriendsService.destroyFriend(id)
            .then(res =>
            {
                hashHistory.push('/');
                dispatch({type: types.deleteUserFromFriendsSuccess, payload: res.data.data});
            })
            .catch(error => dispatch({type: types.deleteUserFromFriendsError, payload: error}));
    }
}

export function socket_queryOnlineUsers(friends = null) {
    return (dispatch, store) => {
        if (friends && !_.isArray(friends)) {friends = [friends];}
        if (!friends) {friends = _.map(store()['friendsReducer']['friends'], 'id');}
        dispatch({type: types.socket_queryOnlineFriendsRequest});
        SocketClient.emit('queryOnlineUsers', friends)
            .then(res => dispatch({type: types.socket_queryOnlineFriendsSuccess, payload: res}))
            .catch(error => dispatch({type: types.socket_queryOnlineFriendsError, payload: error}));
    };

}

export function friendshipCreated(friend) {
    return dispatch => {
        dispatch({type: 'addUserToFriendsByIdSuccess', payload: friend});
        dispatch(socket_queryOnlineUsers([friend.id]));
    }
}