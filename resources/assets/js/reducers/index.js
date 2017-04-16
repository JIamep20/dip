import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import currentUserReducer from './currentUserReducer';
import friendsReducer from './friendsReducer';
import groupsReducer from './groupsReducer';
import sidebarsReducer from './sidebarsReducer';
import usersReducer from './usersReducer';
import feedsReducer from './feedsReducer';

export default combineReducers({
    currentUserReducer,
    friendsReducer,
    groupsReducer,
    sidebarsReducer,
    usersReducer,
    feedsReducer,
    routing: routerReducer
});