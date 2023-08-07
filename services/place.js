const { pool } = require('../database');

const getPlaces = async (req, res) => {
    const [place] = await pool.query("SELECT * FROM place");
    res.status(200).json(place);
}

const addPlace = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`INSERT INTO place(name) VALUES (?)`, [data.name])
    res.status(201).json(result.insertId);
}

const getPlaceById = async (req, res) => {
    const [place] = await pool.query(`SELECT * FROM place WHERE id=?`, [req.params.id]);
    res.status(200).json(place);
}

const deletePlace = async (req, res) => {
    await pool.query(`DELETE FROM place WHERE id=?`, [req.params.id])
    res.status(204).json({state: 'Place deleted successfully'});
}

module.exports = { 
    getPlaces,
    addPlace,
    getPlaceById,
    deletePlace
};