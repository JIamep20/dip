import { combineReducers } from 'redux';

import sidebars from './sidebarsReducer';
import currentUser from './currentUserReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    currentUser,
    sidebars,
    routing: routerReducer
});