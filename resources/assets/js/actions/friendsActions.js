import * as types from '../constants/friendshipsActionsConst';
import FriendsService from '../services/friend.service';

export function fetchFriendships() {
    return function(dispatch) {
        dispatch({type: types.getFriendsRequest});
        return FriendsService.getFriends()
            .then(res => dispatch({type: types.getFriendsSuccess, payload: res.data.data}))
            .catch(error => dispatch({type: types.getFriendsError, payload: error}));
    }
}

export function loadFriendMessages(id) {
    return (dispatch, getStore) => {
        if(!getStore().friendsReducer['isLoadingMessages'][id] && !getStore().friendsReducer['messages'][id]) {
            dispatch({type: types.loadFriendMessagesRequest, payload: {id}});
            FriendsService.loadFriendMessages(id)
                .then(res => dispatch({type: types.loadFriendMessagesSuccess, payload: {res: res.data.data, id}}))
                .catch(error => dispatch({type: types.loadFriendMessagesError, payload: {error, id}}));
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