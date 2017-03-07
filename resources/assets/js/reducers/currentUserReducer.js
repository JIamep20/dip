import { FETCH_USER_SUCCESS, FETCH_USER_ERROR, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from '../actions/usersActions';

const initialState = {
    user: {},
    errors: {}
};

export default function userReducer(state = initialState, {type, payload}) {
    switch(type){
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: payload
            };

        case UPDATE_USER_ERROR:
            return {
                ...state,
                errors: payload
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                errors: {}
            };

        default:
            return state;
    }
}