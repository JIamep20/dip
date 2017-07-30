import * as types from '../constants/groupsActionsConst';
import GroupService from '../services/group.service';
import MessageService from '../services/message.service';
import { hashHistory } from 'react-router';

export function fetchGroups() {
    return (dispatch, getState) => {
        dispatch({type: types.getGroupsRequest});
        GroupService.getGroups()
            .then(res => dispatch({type: types.getGroupsSuccess, payload: res.data.data}))
            .catch(error => dispatch({type: types.getGroupsError, payload: error}));
    }
}

export function fetchGroupMessages(id) {
    return (dispatch, getStore) => {
        if(!getStore()['groups']['isLoadingMessages'][id] && !getStore()['groups']['messages'][id]) {
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

export function leaveGroup(id) {
    return (dispatch) => {
        dispatch({type: types.leaveGroupRequest});
        GroupService.leaveGroup(id)
            .then(res => {
                hashHistory.push('/');
                dispatch({type: types.leaveGroupSuccess, payload: res.data.data})
            })
            .catch(error => dispatch({type: types.leaveGroupError, payload: error}));
    }
}

export function addUserToGroup(group_id, user_id) {
    return dispatch => {
        dispatch({type: types.addUserToGroupRequest});
        GroupService.addUserToGroupById(group_id, user_id)
            .then(res => dispatch({type: types.addUserToGroupSuccess, payload: {id: group_id, res: res.data.data}}))
            .catch(error => dispatch({type: types.addUserToGroupError, payload: error}));
    }
}

export function createGroup(name) {
    return dispatch => {
        dispatch({type: types.createGroupRequest});
        GroupService.storeGroup({name})
            .then(res => dispatch({type: types.createGroupSuccess, payload: res.data.data}))
            .catch(error => dispatch({type: types.createGroupError, payload: error}));
    }
}