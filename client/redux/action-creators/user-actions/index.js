import * as actionTypes from "../../actionTypes";

export const authInitExistingUser = (user) => {
    return {
        type: actionTypes.AUTH_INIT_EXISTING_USER,
        user
    }
};

export const authInitNoUser = () => {
    return {
        type: actionTypes.AUTH_INIT_NO_USER,
    }
};

export const authUserLoginStart = () => {
    return {
        type: actionTypes.AUTH_USER_LOGIN_START,
    }
};

export const authUserLoginSuccess = (user) => {
    return {
        type: actionTypes.AUTH_USER_LOGIN_SUCCESS,
        user
    }
};

export const authUserLoginFail = (error) => {
    return {
        type: actionTypes.AUTH_USER_LOGIN_FAIL,
        error
    }
};

export const authUserLogout = () => {
    return {
        type: actionTypes.AUTH_USER_LOGOUT
    }
};

