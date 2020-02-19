import {combineReducers} from 'redux';

import dogoReducer from './dogo-reducer';
import favoritesReducer from './favorites-dogo-reducer';
import notificationReducer from './notification-reducer';
import userReducer from './user-reducer';

const reducers = combineReducers({
    dogos: dogoReducer,
    favorites: favoritesReducer,
    notifications: notificationReducer,
    user: userReducer
});

export default reducers;
