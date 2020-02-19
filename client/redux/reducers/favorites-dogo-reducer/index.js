import * as actionTypes from '../../actionTypes';

const initialState = {
    items: {},
    error: false,
    isLoading: false
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FAVORITES:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_FAVORITES_SUCCESS:
            return {
                ...state,
                items: action.favoriteDogos,
                error: false,
                isLoading: false
            };
        case actionTypes.FETCH_FAVORITES_FAIL:
            return {
                ...state,
                error: true,
                isLoading: false
            };
        case actionTypes.ADD_FAVORITE:
            return {
                ...state,
                items: Object.assign({}, state.items, {[action.dogoUrl]: {isLoading: true}}),
            };
        case actionTypes.ADD_FAVORITE_SUCCESS:
            return {
                ...state,
                items: Object.assign({}, state.items, {[action.dogoUrl]: {url: action.dogoUrl, isLoading: false}}),
                error: false,
                isLoading: false
            };
        case actionTypes.ADD_FAVORITE_FAIL:
            return {
                ...state,
                items: Object.assign({}, state.items, {[action.dogoUrl]: {isLoading: false, isError: true}}),
                error: true,
                isLoading: false
            };
        case actionTypes.DELETE_FAVORITE:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.DELETE_FAVORITE_SUCCESS:
            const newItemsObject = Object.assign({}, state.items);
            delete newItemsObject[action.dogoImageUrl];

            return {
                ...state,
                items: newItemsObject,
                error: false,
                isLoading: false
            };
        case actionTypes.DELETE_FAVORITE_FAIL:
            return {
                ...state,
                error: true,
                isLoading: false
            };
        case actionTypes.AUTH_USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};


export default favoritesReducer;
