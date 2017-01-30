import { FETCH_USER_SUCCESS, FETCH_USER_ERROR } from '../actions/currentUserActions.js';

const initialState = {
    currentUser: null
};

export default function currentUserReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            };

        default:
            return state;
    }
}