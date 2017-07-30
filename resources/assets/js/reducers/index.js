import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import currentUserReducer from './currentUserReducer';
import groupsReducer from './groupsReducer';
import feedsReducer from './feedsReducer';

export default combineReducers({
    currentUser: currentUserReducer,
    groups: groupsReducer,
    feeds: feedsReducer,
    routing: routerReducer
});