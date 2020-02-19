const functions = require('firebase-functions');
const admin = require('firebase-admin');

if (process.env.DEV){
    const serviceAccount = require("/Users/shpionka/.firebase-dev/dogos-keeper-firebase-adminsdk.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://dogos-keeper.firebaseio.com"
    });
} else {
    admin.initializeApp();
}


const expressApp = require('./server/server');
const expressFunction = functions.https.onRequest(expressApp);

module.exports = {
    dogosApi: expressFunction
};
