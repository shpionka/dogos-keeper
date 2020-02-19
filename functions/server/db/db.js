const admin = require('firebase-admin');
const db = admin.firestore();

const emptyUserDocument = {
    dogos: {},
};

async function upsertFavoriteDogos(dogoUrl, userId) {
    const userFaviritesDocSnapshot = await db.collection('favorite_dogos').doc(userId).get();

    if (userFaviritesDocSnapshot.exists) {
        const existingUserFavDoc = userFaviritesDocSnapshot.data();
        const maybeDogoInfo = existingUserFavDoc.dogos[dogoUrl];

        existingUserFavDoc.dogos[dogoUrl] = upsertDogoUrlCount(maybeDogoInfo, dogoUrl);
        await db.collection('favorite_dogos').doc(userId).set(existingUserFavDoc);
    } else {
        const dogoDocument = Object.assign({}, emptyUserDocument, {dogos: {[dogoUrl]: {url: dogoUrl, count: 1}}});
        await db.collection('favorite_dogos').doc(userId).set(dogoDocument);
    }
}

async function getFavoriteDogos(userId) {
    const docSnapshot = await db.collection('favorite_dogos').doc(userId).get();
    if (docSnapshot.exists) {
        return docSnapshot.data();
    } else {
        return emptyUserDocument;
    }
}

async function deleteFavoriteDogo(userId, imageUrl){
    const docSnapshot = await db.collection('favorite_dogos').doc(userId).get();
    if (docSnapshot.exists) {
        const usersFavoriteDogos = docSnapshot.data();
        delete usersFavoriteDogos.dogos[imageUrl];

        await db.collection('favorite_dogos').doc(userId).set(usersFavoriteDogos);
    } else {
        return emptyUserDocument;
    }
}

function upsertDogoUrlCount(maybeDogoUrl, dogoUrl){
    if (maybeDogoUrl){
        maybeDogoUrl.count = maybeDogoUrl.count + 1;
        return Object.assign({} , maybeDogoUrl, { count: maybeDogoUrl.count + 1 });
    } else {
        return {
            url: dogoUrl,
            count: 1
        }
    }
}

module.exports = {upsertFavoriteDogos, getFavoriteDogos, deleteFavoriteDogo};
