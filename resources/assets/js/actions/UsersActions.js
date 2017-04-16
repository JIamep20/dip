import * as types from '../constants/usersActionsConst';
import UserService from '../services/user.service';
import FriendService from  '../services/friend.service';
import {socket_queryOnlineUsers} from './friendsActions';

export function fetchUsersByFilterString(string) {
    return function(dispatch) {
        dispatch({type: types.fetchUsersByFilterStringRequest, payload: string});
        return UserService.findUsers(string)
            .then(res => dispatch({type: types.fetchUsersByFilterStringSuccess, payload: res.data.data}))
            .catch(error => dispatch({type: types.fetchUsersByFilterStringError, payload: error}));
    }
}

export function addUserToFriendsById(id) {
    return function(dispatch) {
        dispatch({type:types.addUserToFriendsByIdRequest});
        return FriendService.storeFriend(id)
            .then(res => {
                dispatch({type: types.addUserToFriendsByIdSuccess, payload: res.data.data});
                dispatch(socket_queryOnlineUsers(res.data.data.id));
            })
            .catch(error => dispatch({type: types.addUserToFriendsByIdError, payload: error}));
    }
}