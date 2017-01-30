import axios from 'axios';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export function fetchCurrentUser() {
    return function(dispatch) {
        axios.get('api/user')
            .then(response => dispatch({type: FETCH_USER_SUCCESS, payload: response.data}))
            .catch(error => dispatch({type: FETCH_USER_ERROR, payload}));
    }
}