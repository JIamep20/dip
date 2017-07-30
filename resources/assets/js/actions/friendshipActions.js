import * as friendshipsActions from '../constants/friendshipsActionsConst';
import FriendshipService from '../services/friendship.service';

import {friendshipSynchronization} from './socketActions';

import _ from 'lodash';


export function fetchFriendships() {
    return (dispatch, store) => {
        dispatch({type: friendshipsActions.fetchFriendsRequest});
        FriendshipService.fetchFriendships()
            .then(response => transformFriendships(response.data.data, store()['currentUser']['user']['id']))
            .then(items => dispatch({type: friendshipsActions.fetchFriendsSuccess, payload: items}))
            .then(() => dispatch(friendshipSynchronization()))
            .catch(error => dispatch({type: friendshipsActions.fetchFriendsError, payload: error}));
    };
}

function transformFriendships(items, id) {
    return _.map(items, (item) => transformFriendship(item, id));
}

function transformFriendship(item, id) {
    if (!(item.recipient && item.sender)) {
        return item;
    }
    item.friendObject = parseInt(item.sender.id) === parseInt(id) ? item.recipient : item.sender;
    delete item.sender;
    delete item.recipient;
    return item;
}