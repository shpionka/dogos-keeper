const axios = require('axios');

function getDogos(limit = 12) {
    return axios.get(`http://shibe.online/api/shibes?count=${limit}`)
        .then((response) => {
            return response.data; // dogo[]
        }).catch((error) => {
            console.error("Couldn't get dogos", error);
            return error;
        });
}

module.exports = {
    getDogos
};
