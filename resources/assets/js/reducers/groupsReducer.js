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

        default: return state;
    }

}