const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const {getDogos} = require('./api/api');
const {upsertFavoriteDogos, getFavoriteDogos, deleteFavoriteDogo} = require('./db/db');
const {validateFirebaseIdToken} = require('./middleware/firebse-user-middleware');

app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/api/dogos', function (req, res) {
    const limit = req.query.limit;
    getDogos(limit).then((dogos) => {
        res.send(dogos);
    }).catch((error) => {
        console.error("Couldn't get dogos", error);
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({
                error: "Something went wrong"
            });
        }
    })
});

app.post('/api/favorites', validateFirebaseIdToken, async (req, res) => {
    if (req.body.imageUrl) {
        const userId = req.userId;
        await upsertFavoriteDogos(req.body.imageUrl, userId);
        return res.status(201).send();
    } else {
        return res.status(400).send({
            error: "Missing image URL"
        });
    }
});

app.get('/api/favorites', validateFirebaseIdToken, async (req, res) => {
    const userId = req.userId;
    const favoriteDogos = await getFavoriteDogos(userId);
    res.send(favoriteDogos);
});

app.delete('/api/favorites', validateFirebaseIdToken, async (req, res) => {
    const userId = req.userId;
    const imageUrl = req.query.imageUrl;

    if (!imageUrl){
        return res.status(400).send({
            error: 'Missing imageUrl'
        });
    }

    const favoriteDogos = await deleteFavoriteDogo(userId, imageUrl);
    res.status(204).send(favoriteDogos);
});



module.exports = app;
