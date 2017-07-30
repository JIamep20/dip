import _ from 'lodash';

import { fetchCurrentUser } from './currentUserActions';
import { fetchGroups } from './groupActions';
import { fetchFriendships } from './friendshipActions';

import {resetFriendshipMessages} from '../constants/friendshipsActionsConst';
import {resetGroupMessages} from '../constants/groupsActionsConst';

import socketClient from '../socketClient';

export function initApp() {
    return (dispatch, store) => {
        socketClient.configurateStore({dispatch, store});
        socketClient.connect();
        let user = _.get(window, 'initApp.user', null);
        dispatch(fetchCurrentUser(user));
        dispatch(refreshApp());
    };
}

export function refreshApp() {
    return (dispatch, store) => {
        dispatch({type: resetFriendshipMessages});
        dispatch({type: resetGroupMessages});
        dispatch(fetchGroups());
        dispatch(fetchFriendships());
    };
}