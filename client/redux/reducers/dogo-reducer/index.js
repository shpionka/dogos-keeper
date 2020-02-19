import * as actionTypes from '../../actionTypes';

const initialState = {
    items: [],
    error: false,
    isLoading: false
};

const dogoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DOGOS_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_DOGOS_SUCCESS:
            // const dogosIndex = action.dogos
            //     .reduce((acc, dogoUrl) => acc[dogoUrl] = {url: dogoUrl, isLoading: false}, {});
            return {
                ...state,
                items: action.dogos,
                error: false,
                isLoading: false
            };
        case actionTypes.FETCH_DOGOS_FAIL:
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

export function selectDogosWithFavoritesInfo(dogos, favoriteDogos) {
    return dogos.map((dogoImageUrl) => {
        const favoriteDogo = favoriteDogos[dogoImageUrl];
        const favoriteDogoExists = favoriteDogo !== undefined && favoriteDogo.url;
        const isDogoLoading = favoriteDogo && favoriteDogo.isLoading || false;
        return {
            dogoImageUrl,
            favoriteDogoExists,
            isDogoLoading
        }
    });
}

export default dogoReducer;
