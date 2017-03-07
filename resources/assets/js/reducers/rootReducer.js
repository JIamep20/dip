import { combineReducers } from 'redux';

import sidebars from './sidebarsReducer';
import currentUser from './currentUserReducer';
import users from './usersReducer';
import friends from './friendsReducer';
import messages from './messagesReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    currentUser,
    sidebars,
    users,
    friends,
    messages,
    routing: routerReducer
});