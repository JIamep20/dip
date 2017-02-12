import { FETCH_USER_SUCCESS, FETCH_USER_ERROR, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from '../actions/UsersActions';

const initialState = {
    user: {},
    errors: {}
};

export default function userReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            };

        case UPDATE_USER_ERROR:
            return {
                ...state,
                errors: action.payload
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                errors: {}
            };

        default:
            return state;
    }
}