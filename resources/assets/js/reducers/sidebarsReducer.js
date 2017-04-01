import * as types from '../constants/sidebarsActionsConst';
import _ from 'lodash';

const initialState = {
    left: true,
    right: false
};

export default function (state = initialState, {type}) {
    switch (type) {
        case types.toggleLeftSidebar:
            return {
                ...state,
                left: !state.left
            };
        case types.toggleRightSidebar:
            return {
                ...state,
                right: !state.right
            };
        default: return state;
    }
}