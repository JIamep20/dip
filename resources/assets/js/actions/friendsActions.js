import FriendsService from '../services/friends.service.js';
import socketClient from '../socketClient';

export const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_ERROR = 'FETCH_FRIENDS_ERROR';

export const SOCKET_QUERY_ONLINE_FRIENDS_REQUEST = 'SOCKET_QUERY_ONLINE_FRIENDS_REQUEST';
export const SOCKET_QUERY_ONLINE_FRIENDS_SUCCESS = 'SOCKET_QUERY_ONLINE_FRIENDS_SUCCESS';
export const SOCKET_QUERY_ONLINE_FRIENDS_ERROR = 'SOCKET_QUERY_ONLINE_FRIENDS_ERROR';

export const SOCKET_FRIEND_STATUS_CHANGE = 'SOCKET_FRIEND_STATUS_CHANGE';

export function fetchFriends() {
    return (dispatch) => {
        nprogress.start();
        FriendsService.fetchFriends()
            .then(friends => {nprogress.done();
                dispatch({type: FETCH_FRIENDS_SUCCESS, payload: friends});
                dispatch(queryOnlineUsers(friends));
            })
            .catch(error => dispatch({type: FETCH_FRIENDS_ERROR, payload: error}))
            .finally(() => nprogress.done());
    };
}

export function queryOnlineUsers(friends = null) {
    return (dispatch, getState) => {
        if(!friends) {friends = getState().friends.friends;}
        socketClient.emit('queryOnlineUsers', friends.map(({user}) => ({id: user.id})))
            .then(response => {dispatch({type: SOCKET_QUERY_ONLINE_FRIENDS_SUCCESS, payload: response})})
            .catch(error => dispatch({type: SOCKET_QUERY_ONLINE_FRIENDS_ERROR, payload: error}));
    };

}