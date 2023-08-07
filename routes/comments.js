const express = require('express');
const router = express.Router();
const { addComment, getComments, getCommentById, updateComment, deleteComment } = require('../services/comment');

router.route('/')
.get(getComments)
// .post(addView)

router.post('/add/:contentId/:userId', addComment)
// router.get('/:userId', getAllUsersView)
// router.get('/visitor/:userId', getVisitors)

router.route('/:id')
.get(getCommentById)
.put(updateComment)
.delete(deleteComment)

// router.get('/pseudo/:pseudo', getUserByPseudo)
// router.get('/email/:email', getUserByEmail)


module.exports = router;