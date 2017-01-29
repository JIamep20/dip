export const TOGGLE_LEFT_SIDEBAR = 'TOGGLE_LEFT_SIDEBAR';
export const TOGGLE_RIGHT_SIDEBAR = 'TOGGLE_RIGHT_SIDEBAR';

export function toggleLeftSidebar() {
    return {
        type: TOGGLE_LEFT_SIDEBAR
    };
}

export function toggleRightSidebar() {
    return {
        type: TOGGLE_RIGHT_SIDEBAR
    };
}