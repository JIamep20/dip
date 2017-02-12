import {
    FIND_USERS_ERROR,
    FIND_USERS_REQUEST,
    FIND_USERS_SUCCESS,
    ADD_USER_SUCCESS,
    FETCH_FRIENDS_SUCCESS,
    SOCKET_QUERY_ONLINE_FRIENDS_SUCCESS
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

        case SOCKET_QUERY_ONLINE_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: state.friends.map(friend => {
                    return {
                        ...friend,
                        status: friend.status || action.payload.some(item => item.id == friend.user.id && item.status == true)
                    };
                })
            };

        case 'SOCKET_USER_STATUS_CHANGE':
            return {
                ...state,
                friends: state.friends.map(friend => {
                    if (friend.user.id == action.payload.id) {
                        return {
                            ...friend,
                            status: action.payload.status
                        };
                    }

                    return friend;
                })
            };

        default:
            return state;
    }
}