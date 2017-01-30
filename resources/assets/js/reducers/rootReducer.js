import { combineReducers } from 'redux';

import sidebars from './sidebarsReducer';
import currentUser from './currentUserReducer';

export default combineReducers({
    sidebars,
    currentUser
});