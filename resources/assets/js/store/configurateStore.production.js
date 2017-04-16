import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

// Middleware you want to use in production:
const enhancer = applyMiddleware(thunk, routerMiddleware(hashHistory));

export default function configureStore(initialState = {}) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    return createStore(rootReducer, initialState, enhancer);
};