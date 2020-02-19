import * as actionTypes from "../../actionTypes";
import {fetchRemoteDogos} from '../../../api/api';

export const fetchDogosSuccess = (dogos) => {
    return {
        type: actionTypes.FETCH_DOGOS_SUCCESS,
        dogos: dogos
    }
};

export const fetchDogosFail = (error) => {
    return {
        type: actionTypes.FETCH_DOGOS_FAIL,
        error: error
    }
};

export const fetchDogosStart = () => {
    return {
        type: actionTypes.FETCH_DOGOS_START
    }
};

export const fetchDogos = (limit = 24) => {
    return dispatch => {
        dispatch(fetchDogosStart());
        fetchRemoteDogos(limit)
            .then((response) => {
                dispatch(fetchDogosSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchDogosFail(error))
            })
    }
};



