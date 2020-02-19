// PROD  BASE_FUNCTION_URL: '"https://us-central1-dogos-keeper.cloudfunctions.net/dogosApi"',

const firebaseConfig = {
    apiKey: "AIzaSyDcoMSYqr7LKsVVDqqa1bHnu8CvPMZWE6s",
    authDomain: "dogos-keeper.firebaseapp.com",
    databaseURL: "https://dogos-keeper.firebaseio.com",
    projectId: "dogos-keeper",
    storageBucket: "dogos-keeper.appspot.com",
    messagingSenderId: "973352658464",
    appId: "1:973352658464:web:acffab2b87357d8e6c7e45",
    measurementId: "G-C8DLWSYJ9P"
};

let baseFunctionUrl;

if (process.env.DEV){
    baseFunctionUrl = '"http://localhost:5001/dogos-keeper/us-central1/dogosApi"';
} else {
    baseFunctionUrl = '"https://us-central1-dogos-keeper.cloudfunctions.net/dogosApi"';
}

const config = {
  BASE_FUNCTION_URL: baseFunctionUrl,
  FIREBASE_CONFIG: JSON.stringify(firebaseConfig),
  HOME_PAGE_DOGOS_NUMBER: 24
};

module.exports = config;
