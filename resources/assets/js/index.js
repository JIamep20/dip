/* Vendors */
import React from "react";
import { render } from "react-dom";
import { Redirect, IndexRoute, Route, Router, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import '../../../node_modules/nprogress/nprogress.css';

require('promise.prototype.finally').shim();

window.nprogress = require('nprogress');
nprogress.configure({ showSpinner: false });

/* Sockets module */
import socketClient from './socketClient';
//import Room from './webrtc/Room';

/* Redux */
import configureStore from './store/configurateStore.js';
import { Provider } from 'react-redux';

/* Containers */
import App from './App';

/* Store initialize */
const store = configureStore({});
const history = syncHistoryWithStore(hashHistory, store);

import { initApp } from './actions/commonActions';

store.dispatch(initApp());
//window.Room = new Room(store.getState, store.dispatch);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>

            </Route>
            <Redirect from="*" to="/" />
        </Router>
    </Provider>),
    document.getElementById('app'));