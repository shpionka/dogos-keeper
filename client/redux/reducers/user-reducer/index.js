import * as actionTypes from '../../actionTypes';

const initialState = {
    user: undefined,
    isLoginInProgress: false,
    isAuthInitDone: false,
    error: undefined
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_INIT_EXISTING_USER:
            return {
                user: extractUserFromFirebaseAuthInfo(action.user),
                isAuthInitDone: true
            };
        case actionTypes.AUTH_INIT_NO_USER:
            return {
                user: undefined,
                isAuthInitDone: true
            };
        case actionTypes.AUTH_USER_LOGIN_START:
            return {
                ...state,
                isLoginInProgress: true
            };
        case actionTypes.AUTH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: extractUserFromFirebaseAuthInfo(action.user),
                isLoginInProgress: false,
                isAuthInitDone: true,
                error: undefined
            };
        case actionTypes.AUTH_USER_LOGIN_FAIL:
            return {
                ...state,
                error: action.error,
                isLoginInProgress: false,
                isAuthInitDone: true
            };
        case actionTypes.AUTH_USER_LOGOUT:
            return {
                ...state,
                user: undefined,
                error: undefined
            };
        default:
            return state;
    }
};

function extractUserFromFirebaseAuthInfo(firebaseAuthUserInfo){
    return {
        displayName: firebaseAuthUserInfo.displayName,
        email: firebaseAuthUserInfo.email,
        uid: firebaseAuthUserInfo.uid,
        photoURL: firebaseAuthUserInfo.photoURL
    }
}

export default userReducer;
