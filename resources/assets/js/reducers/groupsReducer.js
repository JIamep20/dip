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
            state.isLoadingMessages[payload] = true;
            return {...state};
        case types.loadGroupMessagesSuccess:
            delete state.isLoadingMessages[payload.id];
            state.messages[payload.id] = payload.res;
            return {...state};
        case types.loadGroupMessagesError:
            delete state.isLoadingMessages[payload.id];
            console.log(type, payload.error);
            return {...state};
        
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
            return {
                ...state,
                friends: {...state.friend}
            };
        case types.leaveGroupError:
            console.error(type, payload);
            return state;

        default: return state;
    }

}