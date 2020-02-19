import * as actionTypes from "../../actionTypes";
import {deleteRemoteFavoriteDogo, fetchRemoteFavorites, upsertRemoteDogoFavorite} from '../../../api/api';
import {queueNotification} from "../notifiation-actions";

export const addFavorite = (imageUrl) => {
    return {
        dogoUrl: imageUrl,
        type: actionTypes.ADD_FAVORITE
    }
};

export const addFavoriteSuccess = (dogoUrl) => {
    return {
        type: actionTypes.ADD_FAVORITE_SUCCESS,
        dogoUrl
    }
};

export const addFavoriteFail = (imageUrl) => {
    return {
        type: actionTypes.ADD_FAVORITE_FAIL,
        dogoUrl: imageUrl,
    }
};

export const addFavoriteAsync = (imageUrl) => {
    return dispatch => {
        dispatch(addFavorite(imageUrl))
        upsertRemoteDogoFavorite(imageUrl)
            .then(() => {
                dispatch(addFavoriteSuccess(imageUrl));
                dispatch(queueNotification('success', 'Added dogo to favorites!'));
            })
            .catch(error => {
                dispatch(addFavoriteFail(imageUrl))
            })
    }
};

export const fetchFavorites = () => {
    return {
        type: actionTypes.FETCH_FAVORITES
    }
};

export const fetchFavoritesSuccess = (favoriteDogos) => {
    return {
        type: actionTypes.FETCH_FAVORITES_SUCCESS,
        favoriteDogos: favoriteDogos
    }
};

export const fetchFavoritesFail = (error) => {
    return {
        type: actionTypes.FETCH_FAVORITES_FAIL,
        error: error
    }
};

export const fetchFavoritesAsync = () => {
    return dispatch => {
        dispatch(fetchFavorites());
        fetchRemoteFavorites()
            .then(dogos => {
                dispatch(fetchFavoritesSuccess(dogos))
            })
            .catch(error => {
                dispatch(fetchFavoritesFail(error))
            })
    }
};

export const deleteFavorite = (dogoImageUrl) => {
    return {
        type: actionTypes.DELETE_FAVORITE,
        dogoImageUrl
    }
};

export const deleteFavoriteSuccess = (dogoImageUrl) => {
    return {
        type: actionTypes.DELETE_FAVORITE_SUCCESS,
        dogoImageUrl
    }
};

export const deleteFavoriteFail = (error) => {
    return {
        type: actionTypes.DELETE_FAVORITE_FAIL,
        error: error
    }
};

export const deleteFavoriteAsync = (dogoImageUrl) => {
    return dispatch => {
        dispatch(deleteFavorite(dogoImageUrl));
        deleteRemoteFavoriteDogo(dogoImageUrl)
            .then(() => {
                dispatch(deleteFavoriteSuccess(dogoImageUrl))
            })
            .catch(error => {
                dispatch(deleteFavoriteFail(error))
            })
    }
};
