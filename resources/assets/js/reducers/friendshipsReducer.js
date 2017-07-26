import * as types from '../constants/friendshipsActionsConst';
import _ from 'lodash';

const initialState = {
    friends: {},
    online: {},
    isLoadingMessages: {},
    messages: {}
};

export default function friendsReducer(state = initialState, {type, payload}) {
    switch (type) {
        case types.getFriendsRequest:
            return state;
        case types.getFriendsSuccess:
            return {
                ...state,
                friends: _.mapKeys(payload, 'id')
            };
        case types.getFriendsError:
            console.log(type, payload);
            return state;

        case types.loadFriendMessagesRequest:
            return {
                ...state,
                isLoadingMessages: {...state.isLoadingMessages, [payload.id]: false}
            };
        case types.loadFriendMessagesSuccess:
            delete state.isLoadingMessages[payload.id];
            state.messages[payload.id] = payload.res;
            return {
                ...state,
                isLoadingMessages: {...state.isLoadingMessages}
            };
        case types.loadFriendMessagesError:
            delete state.isLoadingMessages[payload.id];
            console.log(type, payload.error);
            return {...state};

        case types.createFriendMessageRequest:
            return state;
        case types.createFriendMessageSuccess:
            if(state.messages[payload.id]) {
                state.messages[payload.id] = state.messages[payload.id].concat(payload.res);
            }
            return {...state};
        case types.createFriendMessageError:
            console.log(type, payload);
            return state;

        case types.deleteUserFromFriendsRequest:
            return state;
        case types.deleteUserFromFriendsSuccess:
            delete state.friends[payload.id];
            delete state.messages[payload.id];
            return {
                ...state,
                friends: {...state.friends},
                messages: {...state.messages}
            };
        case types.deleteUserFromFriendsError:
            console.error(type, payload);
            return state;

        case types.socket_queryOnlineFriendsRequest:
            return state;
        case types.socket_queryOnlineFriendsSuccess:
            _.forEach(payload, (item) => {
                if (!!state.friends[item.id]) {
                    state.online[item.id] = item.status;
                }
            });
            return {
                ...state,
                online: {...state.online}
            };
        case types.socket_queryOnlineFriendsError:
            console.log(type, payload);
            return state;
        case types.socket_userStatusChanged:
            if (!!state.friends[payload.id]) {
                state.online[payload.id] = payload.status;
                return {
                    ...state,
                    online: {...state.online}
                }
            }
            return state;


        default: return state;
    }
}