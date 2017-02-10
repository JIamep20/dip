import axios from 'axios';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export function fetchCurrentUser() {
    return function(dispatch) {
        return axios.get('api/user')
            .then(response => dispatch({type: FETCH_USER_SUCCESS, payload: response.data}))
            .catch(error => dispatch({type: FETCH_USER_ERROR, payload: error}));
    }
}

export function updateCurrentUser(model) {
    return function(dispatch) {
        return axios.put('api/user', model)
            .then(response => dispatch({type: UPDATE_USER_SUCCESS, payload: response.data}))
            .catch(error => dispatch({type: UPDATE_USER_ERROR, payload:error.response.data}));
    }
}