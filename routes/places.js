const express = require('express');
const router = express.Router();
const { getPlaces, addPlace, getPlaceById, deletePlace } = require('../services/place');

router.route('/')
.get(getPlaces)
// .post(addView)

router.post('/add', addPlace)

router.route('/:id')
.get(getPlaceById)
.delete(deletePlace)


module.exports = router;