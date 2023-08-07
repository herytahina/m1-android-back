const { pool } = require('../database');

const getCategory = async (req, res) => {
    const [category] = await pool.query("SELECT * FROM category");
    res.status(200).json(category);
}

const addCategory = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`INSERT INTO category(name) VALUES (?)`, [data.name])
    res.status(201).json(result.insertId);
}

const getCategoryById = async (req, res) => {
    const [category] = await pool.query(`SELECT * FROM category WHERE id=?`, [req.params.id]);
    res.status(200).json(category);
}

const deleteCategory = async (req, res) => {
    await pool.query(`DELETE FROM category WHERE id=?`, [req.params.id])
    res.status(204).json({state: 'Category deleted successfully'});
}

module.exports = { 
    getCategory,
    addCategory,
    getCategoryById,
    deleteCategory
};