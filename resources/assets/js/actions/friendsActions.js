import * as types from '../constants/friendshipsActionsConst';
import FriendsService from '../services/friend.service';

export function fetchFriendships() {
    return function(dispatch) {
        dispatch({type: types.getFriendsError});
        return FriendsService.getFriends()
            .then(res => dispatch({type: types.getFriendsSuccess, payload: res.data.data}))
            .catch(error => dispatch({type: types.getFriendsError, payload: error}));
    }
}