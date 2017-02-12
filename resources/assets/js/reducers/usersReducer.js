import {
    FIND_USERS_ERROR,
    FIND_USERS_REQUEST,
    FIND_USERS_SUCCESS,
    ADD_USER_SUCCESS,
    FETCH_FRIENDS_SUCCESS
} from '../actions/UsersActions';


const initialState = {
    searchString: '',
    searchedUsers: [],
    friends: []
};

export default function findUsersReducer(state = initialState, action) {
    switch (action.type) {
        case FIND_USERS_SUCCESS:
            return {
                ...state,
                searchString: action.payload.query,
                searchedUsers: action.payload.data
            };

        case FETCH_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: action.payload
            };

        case ADD_USER_SUCCESS:
            return {
                ...state,
                searchedUsers: state.searchedUsers.filter((item) => item.id !== action.payload.user.id),
                friends: state.friends.concat(action.payload)
            };

        default:
            return state;
    }
}