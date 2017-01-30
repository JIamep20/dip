import React from "react";
import { render } from "react-dom";
import { IndexRoute, Route, Router, IndexRedirect, hashHistory } from 'react-router';

import { fetchCurrentUser } from './actions/currentUserActions';
import socketClient from './socketClient';

import configureStore from './store/configurateStore.js';
import { Provider } from 'react-redux';

import App from './containers/App';

const store = configureStore({});

socketClient.connect();
store.dispatch(fetchCurrentUser());

const rootUrl = '/';

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path={rootUrl} component={App}>
            </Route>
        </Router>
    </Provider>), document.getElementById('app'));