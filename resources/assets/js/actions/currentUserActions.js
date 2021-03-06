import * as types from '../constants/currentUserActionsConst';
import UserService from '../services/user.service';

export function fetchCurrentUser(user = null) {
    return function (dispatch) {
        if (!_.isNull(user)) {
            dispatch({type: types.getCurrentUserSuccess, payload: user});
        }
        dispatch({type: types.getCurrentUserRequest});
        return UserService.fetchCurrentUser()
            .then(res => dispatch({type: types.getCurrentUserSuccess, payload: res.data.data}))
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