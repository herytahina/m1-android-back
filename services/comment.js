const { pool } = require('../database');

const getComments = async (req, res) => {
    const [comment] = await pool.query("SELECT * FROM comment");
    res.json(comment);
}

const addComment = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`INSERT INTO comment(user_id, content_id, comment, posted_at) VALUES (?, ?, ?, NOW())`, [req.params.userId, req.params.contentId, data.comment])
    res.status(201).json(result.insertId);
}

const getCommentById = async (req, res) => {
    const [comment] = await pool.query(`SELECT * FROM comment WHERE id=?`, [req.params.id]);
    res.json(comment);
}

const updateComment = async (req, res) => {
    let data = req.body;
    await pool.query("UPDATE comment SET comment=? WHERE id=?", [data.comment, req.params.id])
    res.status(204).json({state: 'Comment updated successfully'});
}

const deleteComment = async (req, res) => {
    await pool.query(`DELETE FROM comment WHERE id=?`, [req.params.id])
    res.status(204).json({state: 'Comment deleted successfully'});
}

module.exports = { 
    addComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment
};