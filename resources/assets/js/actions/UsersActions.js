import UsersService from '../services/users.service';
import socketClient from '../socketClient';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const FIND_USERS_REQUEST = 'FIND_USERS_REQUEST';
export const FIND_USERS_SUCCESS = 'FIND_USERS_SUCCESS';
export const FIND_USERS_ERROR = 'FIND_USERS_ERROR';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';

export function fetchCurrentUser() {
    nprogress.start();
    return function(dispatch) {
        return UsersService.fetchCurrentUser()
            .then(response => dispatch({type: FETCH_USER_SUCCESS, payload: response.data.data}))
            .catch(error => dispatch({type: FETCH_USER_ERROR, payload: error}))
            .finally(() => nprogress.done());
    }
}

export function updateCurrentUser(model) {
    nprogress.start();
    return function(dispatch) {
        return UsersService.updateCurrentUser(model)
            .then(response => dispatch({type: UPDATE_USER_SUCCESS, payload: response.data.data}))
            .catch(error => dispatch({type: UPDATE_USER_ERROR, payload:error.response.data}))
            .finally(() => nprogress.done());
    }
}

export function findUsers(query) {
    nprogress.start();
    return (dispatch, getStore) => {
        dispatch({type: FIND_USERS_REQUEST});

        UsersService.findUsers(query)
            .then(response => dispatch({ type: FIND_USERS_SUCCESS , payload: {data: response.data.data, query: query}}))
            .catch(error => dispatch({type: FIND_USERS_ERROR, payload: error}))
            .finally(() => nprogress.done());
    };
}

export function addUser(id) {
    nprogress.start();
    return (dispatch, getState) => {

        UsersService.addUser(id)
            .then(user => {
                dispatch({type: ADD_USER_SUCCESS, payload: user})
            })
            .catch(error => dispatch({type: ADD_USER_ERROR, payload: error}))
            .finally(() => nprogress.done());
    };
}