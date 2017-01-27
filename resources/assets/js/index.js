import React from "react";
import { render } from "react-dom";
import { IndexRoute, Route, Router, IndexRedirect, hashHistory } from 'react-router';

import configureStore from './store/configurateStore.js';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './app';
import Module1 from './components/module1';
import Module2 from './components/module2';



const store = configureStore();

import reducer from './reducers/rootReducer';

const history = syncHistoryWithStore(hashHistory, store);
const rootUrl = '/';

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path={rootUrl} component={App}>
                <Route path="/module1" component={Module1}/>
                <Route path="/module2" component={Module2}/>
            </Route>
            <Route path="*" component={Module1}/>
        </Router>
    </Provider>), document.getElementById('app'));