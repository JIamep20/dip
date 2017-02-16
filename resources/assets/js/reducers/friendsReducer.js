import {
    FETCH_FRIENDS_SUCCESS,
    SOCKET_QUERY_ONLINE_FRIENDS_SUCCESS,
    SOCKET_FRIEND_STATUS_CHANGE
} from '../actions/friendsActions';

import { ADD_USER_SUCCESS } from '../actions/usersActions';


const initialState = {
    friends: []
};

export default function friendsReducer(state = initialState, action) {
    switch(action.type) {

        case FETCH_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: action.payload
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

        case SOCKET_FRIEND_STATUS_CHANGE:
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

        case ADD_USER_SUCCESS:
            return {
                ...state,
                friends: state.friends.concat(action.payload)
            };

        default:
            return state;
    }
}