import {
    FETCH_FRIENDS_SUCCESS,
    SOCKET_QUERY_ONLINE_FRIENDS_SUCCESS,
    SOCKET_FRIEND_STATUS_CHANGE
} from '../actions/friendshipsActions';

import _ from 'lodash';

import {ADD_USER_SUCCESS} from '../actions/usersActions';


const initialState = {
    friends: {},
    online: {}
};

export default function friendshipsReducer(state = initialState, {type, payload}) {
    switch (type) {

        case FETCH_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: _.mapKeys(payload, 'id')
            };

        case SOCKET_QUERY_ONLINE_FRIENDS_SUCCESS:
            return {
                ...state,
                online: _.mapKeys(payload, 'id')
            };

        case SOCKET_FRIEND_STATUS_CHANGE:
            let id = payload.id;
            return {
                ...state,
                online: {...state.online, [id]: {id, status: payload.status}}
            };

        case ADD_USER_SUCCESS:
            return {
                ...state,
                friends: _.concat(state.friends, payload)
            };

        default:
            return state;
    }
}