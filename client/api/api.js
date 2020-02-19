import axios from "axios";
import firebase from "firebase";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export function fetchRemoteDogos(limit = 24) {
    return axios.get(BASE_FUNCTION_URL + '/api/dogos?limit=' + limit)
}

export async function fetchRemoteFavorites() {
    const token = await getCurrentUserAccessToken();
    const response = await axios.get(BASE_FUNCTION_URL + '/api/favorites', {headers: {"Authorization": `Bearer ${token}`}});
    return response.data.dogos;
}

export async function upsertRemoteDogoFavorite(dogoImageUrl) {
    const token = await getCurrentUserAccessToken();
    return axios.post(BASE_FUNCTION_URL + '/api/favorites', {imageUrl: dogoImageUrl}, {headers: {"Authorization": `Bearer ${token}`}});
}

export async function deleteRemoteFavoriteDogo(dogoImageUrl){
    const token = await getCurrentUserAccessToken();
    debugger;
    return axios.delete(BASE_FUNCTION_URL + '/api/favorites',  {
        headers: {"Authorization": `Bearer ${token}`},
        params: {imageUrl: dogoImageUrl}
    });
}

async function getCurrentUserAccessToken() {
    try {
        return await firebase.auth().currentUser.getIdToken();
    } catch (e) {
        console.error("Failed to fetch firebase token for current user", e);
        throw e;
    }
}
