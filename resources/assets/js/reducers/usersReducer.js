import {
    FIND_USERS_SUCCESS,
    ADD_USER_SUCCESS,
} from '../actions/usersActions';


const initialState = {
    searchString: '',
    searchedUsers: []
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FIND_USERS_SUCCESS:
            return {
                ...state,
                searchString: action.payload.query,
                searchedUsers: action.payload.data
            };
        

        case ADD_USER_SUCCESS:
            return {
                ...state,
                searchedUsers: state.searchedUsers.filter((item) => item.id !== action.payload.user.id)
            };

        default:
            return state;
    }
}