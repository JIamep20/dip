import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import currentUser from './currentUserReducer';
import groups from './groupsReducer';
import feeds from './feedsReducer';
import friendships from './friendshipsReducer';

export default combineReducers({
    currentUser,
    groups,
    friendships,
    feeds,
    routing: routerReducer
});