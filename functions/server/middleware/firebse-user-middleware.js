const admin = require('firebase-admin');
const sha1 = require('sha1');

const validateFirebaseIdToken = async (req, res, next) => {
    console.log('Check if request is authorized with Firebase ID token');

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.');
        res.status(401).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.userId = sha1(decodedIdToken.email);
        next();
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
    }
};


module.exports = {validateFirebaseIdToken};
