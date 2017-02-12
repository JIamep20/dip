/* Vendors */
import React from "react";
import { render } from "react-dom";
import { Redirect, IndexRoute, Route, Router, IndexRedirect, hashHistory } from 'react-router';

/* Current users actions */
import { fetchCurrentUser, fetchFriends } from './actions/UsersActions';

/* Sockets module */
import socketClient from './socketClient';

/* Redux */
import configureStore from './store/configurateStore.js';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

/* Containers */
import App from './containers/App';
import Profile from './containers/UserProfile/UserProfileContainer';
import FindUsers from './containers/FindUser/FindUserContainer';
import Feeds from './containers/FeedsContainer';
import Room from './containers/RoomContainer';
import Container from './containers/ContentContainer';

/* Store initialize */
const store = configureStore({});
const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(fetchCurrentUser());
store.dispatch(fetchFriends());
socketClient.connect(store);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Feeds} />
                <Route path="/user" component={Container}>
                    <IndexRoute component={Profile} />
                    <Route path="find" component={FindUsers} />
                </Route>
                <Route path="/room/:id" component={Room} />
            </Route>
            <Redirect from="*" to="/" />
        </Router>
    </Provider>), document.getElementById('app'));