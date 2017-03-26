import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/';

const logger = createLogger();

const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(logger, thunk),
    // Required! Enable Redux DevTools with the monitors you chose
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);

export default function configureStore(initialState = {}) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    const store = createStore(rootReducer, enhancer);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('../reducers/', () =>
            store.replaceReducer(rootReducer/*.default if you use Babel 6+ */)
        );
    }

    return store;
}