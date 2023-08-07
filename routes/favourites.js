const express = require('express');
const router = express.Router();

const { addFavourite, deleteFavourite, getUserFavouriteContents } = require('../services/favourite');

router.post('/add/:contentId/:userId', addFavourite)

router.route('/:id')
.delete(deleteFavourite)

router.get('/userFavourites/:userId', getUserFavouriteContents)


module.exports = router;