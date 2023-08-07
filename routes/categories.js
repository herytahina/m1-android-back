const express = require('express');
const router = express.Router();

const { getCategory, addCategory, getCategoryById, deleteCategory } = require('../services/category');

router.route('/')
.get(getCategory)

router.post('/add', addCategory)

router.route('/:id')
.get(getCategoryById)
.delete(deleteCategory)


module.exports = router;