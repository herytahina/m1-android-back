const { pool } = require('../database');

const addFavourite = async (req, res) => {
    const [result] = await pool.query(`INSERT INTO favourite(user_id, content_id) VALUES (?, ?)`, [req.params.userId, req.params.contentId])
    res.status(201).json(result.insertId);
}

const deleteFavourite = async (req, res) => {
    await pool.query(`DELETE FROM favourite WHERE id=?`, [req.params.id])
    res.status(204).json({state: 'Favourite deleted successfully'});
}

const getUserFavouriteContents = async (req, res) => {
    const [content] = await pool.query("SELECT * FROM favourite f JOIN content c ON f.content_id = c.id WHERE f.user_id = ?", [req.params.userId]);
    res.status(200).json(content);
}

module.exports = { 
    addFavourite,
    deleteFavourite,
    getUserFavouriteContents
};