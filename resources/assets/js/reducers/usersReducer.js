import {
    FIND_USERS_SUCCESS,
    ADD_USER_SUCCESS,
} from '../actions/usersActions';


const initialState = {
    searchString: '',
    searchedUsers: []
};

export default function usersReducer(state = initialState, {type, payload}) {
    switch (type) {
        case FIND_USERS_SUCCESS:
            return {
                ...state,
                searchString: payload.query,
                searchedUsers: payload.data
            };
        

        case ADD_USER_SUCCESS:debugger;
            return {
                ...state,
                searchedUsers: state.searchedUsers.filter((item) => item.id !== payload.recipient_id)
            };

        default:
            return state;
    }
}