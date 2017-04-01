import * as types from '../constants/groupsActionsConst';
import GroupService from '../services/group.service';

export function getGroups() {
    return (dispatch, getState) => {
        dispatch({type: types.getGroupsRequest});
        GroupService.getGroups()
            .then(res => dispatch({type: types.getGroupsSuccess, payload: res.data.data}))
            .catch(error => dispatch({type: types.getGroupsError, payload: error}));
    }
}