import socketClient from '../socketClient';
import * as types from '../constants/socketActionsConst';

export function friendshipSynchronization() {
    return (dispatch, store) => {
        dispatch({type: types.socketFriendshipSynchronizationStart});
        let friendsIds = _.map(store().friendships.friendships, (item) => ({friendId: item.friendObject.id, friendshipId: item.id}));
        if (_.isEmpty(friendsIds)) {
            return dispatch({type: types.socketFriendshipSynchronizationError, payload: 'No friends ids'});
        }
        socketClient.emit('friendshipSynchronization', friendsIds)
            .then(response => dispatch({type: types.socketFriendshipSynchronizationSuccess, payload: response}))
            .catch(error => dispatch({type: types.socketFriendshipSynchronizationError, payload: error}));
    };
}