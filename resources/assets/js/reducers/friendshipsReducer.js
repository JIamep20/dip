import * as types from '../constants/friendshipsActionsConst';
import * as socketTypes from '../constants/socketActionsConst';
import _ from 'lodash';

const initialState = {
    friendships: {},
    online: {},
    isLoadingMessages: {},
    messages: {}
};

export default function friendshipsReducer(state = initialState, {type, payload}) {
    switch (type) {
        case types.fetchFriendsRequest:
            return state;
        case types.fetchFriendsSuccess:
            return {
                ...state,
                friendships: _.mapKeys(payload, 'id')
            };
        case types.fetchFriendsError:
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
            delete state.friendships[payload.id];
            delete state.messages[payload.id];
            return {
                ...state,
                friendships: {...state.friendships},
                messages: {...state.messages}
            };
        case types.deleteUserFromFriendsError:
            console.error(type, payload);
            return state;

        case socketTypes.socketFriendshipSynchronizationStart:
            return state;
        case socketTypes.socketFriendshipSynchronizationSuccess:
            let online = {};
            _.forEach(payload, ({friendshipId}) => {
                if (!!state.friendships[friendshipId]) {
                    online[friendshipId] = true;
                }
            });
            return {
                ...state,
                online: online
            };
        case socketTypes.socketFriendshipSynchronizationError:
            console.log(type, payload);
            return state;
        case types.socket_userStatusChanged:
            let friendship = _.find(state.friendships, (item) => item.friendObject.id = payload.id);
            if (friendship) {
                return {
                    ...state,
                    online: {...state.online, [friendship.id]: payload.status}
                }
            }
            return state;

        case types.resetFriendshipMessages:
            return {
                ...state,
                messages: {}
            };
            break;


        default: return state;
    }
}