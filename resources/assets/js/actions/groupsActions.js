import * as types from '../constants/groupsActionsConst';
import GroupService from '../services/group.service';
import MessageService from '../services/message.service';

export function getGroups() {
    return (dispatch, getState) => {
        dispatch({type: types.getGroupsRequest});
        GroupService.getGroups()
            .then(res => dispatch({type: types.getGroupsSuccess, payload: res.data.data}))
            .catch(error => dispatch({type: types.getGroupsError, payload: error}));
    }
}

export function loadGroupMessages(id) {
    return (dispatch, getStore) => {
        if(!getStore().groupsReducer['isLoadingMessages'][id] && !getStore().groupsReducer['messages'][id]) {
            dispatch({type: types.loadGroupMessagesRequest, payload: id});
            GroupService.loadGroupMessages(id)
                .then(res => dispatch({type: types.loadGroupMessagesSuccess, payload: {id, res:res.data.data}}))
                .catch(error => dispatch({type: types.loadGroupMessagesError, payload: {id: id, error: error}}));
        }
    }
}

export function createGroupMessage(id, text) {
    return (dispatch, getStore) => {
        dispatch({type: types.createGroupMessageRequest});
        MessageService.storeGroupMessage(id, {text})
            .then(res => dispatch({type: types.createGroupMessageSuccess, payload: {id, res: res.data.data}}))
            .catch(error => dispatch({type: types.createGroupMessageError, payload: error}));
    }
}