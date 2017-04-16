import * as types from '../constants/groupsActionsConst';
import _ from 'lodash';

const initialState = {
    groups: {},
    isLoadingMessages: {},
    messages: {}
};

export default function groupsReducer(state = initialState, {type, payload}) {
    switch (type) {

        case types.getGroupsRequest:
            return state;
        case types.getGroupsSuccess:
            state.groups = _.mapKeys(payload, 'id');
            return {...state};
        case types.getGroupsError:
            console.log(type, payload);
            return state;

        case types.loadGroupMessagesRequest:
            return {
                ...state,
                isLoadingMessages: {
                    ...state.isLoadingMessages,
                    [payload]: true
                }
            };
        case types.loadGroupMessagesSuccess:
            delete state.isLoadingMessages[payload.id];
            state.messages[payload.id] = payload.res;
            return {
                ...state,
                isLoadingMessages: {...state.isLoadingMessages}
            };
        case types.loadGroupMessagesError:
            delete state.isLoadingMessages[payload.id];
            console.log(type, payload.error);
            return {...state, isLoadingMessages: {...state.isLoadingMessages}};
        
        case types.createGroupMessageRequest:
            return state;
        case types.createGroupMessageSuccess:
            if(state.messages[payload.id]) {
                state.messages[payload.id] = state.messages[payload.id].concat(payload.res);
            }
            return {...state};
        case types.createGroupMessageError:
            console.log(type, payload);
            return state;

        case types.leaveGroupRequest:
            return state;
        case types.leaveGroupSuccess:
            delete state.groups[payload.id];
            delete state.messages[payload.id];
            return {
                ...state,
                friends: {...state.friend},
                messages: {...state.messages}
            };
        case types.leaveGroupError:
            console.error(type, payload);
            return state;

        case types.addUserToGroupRequest:
            return state;
        case types.addUserToGroupSuccess:
            let group = _.get(state, `groups.${payload.id}`, false);
            if (group) {
                group.users = group.users.filter(item => item.id != payload.res.id).concat(payload.res);
                return {
                    ...state,
                    groups: {
                        ...state.groups,
                        [payload.id]: {...state.groups[payload.id]}
                    }
                }
            }
            return state;
        case types.addUserToGroupError:
            console.log(type, payload);
            return state;

        case types.socket_addedToGroupNotification:
            payload.group.users = payload.users;
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [payload.group.id]: payload.group
                }
            };
        
        case types.socket_userLeftGroupNotification:
            let groupn = _.get(state, `groups.${payload.group.id}`, false);
            if (groupn) {
                groupn.users = groupn.users.filter((item) => item.id != payload.user.id);
                return {
                    ...state,
                    groups: {
                        ...state.groups,
                        [groupn.id]: {...state.groups[groupn.id]}
                    }
                }
            }
            return state;

        case types.createGroupRequest:
            return state;
        case types.createGroupSuccess:
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [payload.id]: payload
                }
            };
        case types.createGroupError:
            console.log(type, payload);
            return state;

        default: return state;
    }

}