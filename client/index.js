import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import * as firebase from "firebase";

import reducers from "./redux/reducers";
import {showNotification} from "./UI/Notification";

import './index.scss';
import App from './app';

// Initialize Firebase
import {dequeueNotification} from "./redux/action-creators/notifiation-actions";
import {authInitExistingUser, authInitNoUser} from "./redux/action-creators/user-actions";

firebase.initializeApp(FIREBASE_CONFIG);

const store = createStore(reducers, applyMiddleware(thunk, logger));
store.subscribe(() => {
    const currentState = store.getState();
    if (currentState.notifications.queue.length > 0) {
        const notification = currentState.notifications.queue[0];
        showNotification(notification.type, notification.message);
        store.dispatch(dequeueNotification());
    }
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        store.dispatch(authInitExistingUser(user));
        console.debug("Found logged in user", user);
    } else {
        store.dispatch(authInitNoUser());
        console.debug("No active user found");
    }
});

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
