import * as types from '../constants/sidebarsActionsConst';

export function toggleLeftSidebar() {
    return {
        type: types.toggleLeftSidebar
    };
}

export function toggleRightSidebar() {
    return {
        type: types.toggleRightSidebar
    };
}