import * as types from '../constants/currentUserActionsConst';
import UserService from '../services/user.service';

import { fetchFriendships } from './friendsActions';
import { getGroups } from './groupsActions';

export function fetchCurrentUser() {
    return function (dispatch) {
        dispatch({type: types.getCurrentUserRequest});
        return UserService.fetchCurrentUser()
            .then(res => {
                dispatch({type: types.getCurrentUserSuccess, payload: res.data.data});
                dispatch(fetchFriendships());
                dispatch(getGroups());
            })
            .catch(error => dispatch({type: types.getCurrentUserError, payload: error}));
    }
}

export function updateCurrentUser(data) {
    return function (dispatch) {
        dispatch({type: types.updateCurrentUserRequest});
        return UserService.updateCurrentUser(data)
            .then(res => dispatch({type: types.updateCurrentUserSuccess, payload: res.data.data}))
            .catch(error => dispatch({type: types.updateCurrentUserError, payload: error}));
    }
}