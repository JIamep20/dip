/* Vendors */
import React from "react";
import { render } from "react-dom";
import { Redirect, IndexRoute, Route, Router, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import '../../../node_modules/nprogress/nprogress.css';

require('promise.prototype.finally').shim();

window.nprogress = require('nprogress');
nprogress.configure({ showSpinner: false });
/* Current user actions */
import { fetchCurrentUser } from './actions/currentUserActions';
import { loadFriendMessages } from './actions/friendsActions';
import { loadGroupMessages } from './actions/groupsActions';
import { loadFeeds } from './actions/feedsActions';

/* Sockets module */
import socketClient from './socketClient';
//import Room from './webrtc/Room';

/* Redux */
import configureStore from './store/configurateStore.js';
import { Provider } from 'react-redux';

/* Containers */
import App from './App';
import Profile from './components/UserProfile/UserProfileContainer';
import Feeds from './components/Feeds/FeedsContainer';

/* Store initialize */
const store = configureStore({});
const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(fetchCurrentUser());
socketClient.configurateStore(store);
socketClient.connect();
//window.Room = new Room(store.getState, store.dispatch);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Feeds} onEnter={nextState => store.dispatch(loadFeeds())}/>
                <Route path="/user" component={Profile} />
                <Route path="/user/find" component={SearchUsers} />
                <Route path="/friend/:id" component={Friend} onEnter={(nextState) => store.dispatch(loadFriendMessages(nextState.params.id))}/>
                <Route path="/group/:id" component={Group} onEnter={nextState => store.dispatch(loadGroupMessages(nextState.params.id))}/>
                <Route path="/creategroup" component={CreateGroup}/>
            </Route>
            <Redirect from="*" to="/" />
        </Router>
    </Provider>),
    document.getElementById('app'));