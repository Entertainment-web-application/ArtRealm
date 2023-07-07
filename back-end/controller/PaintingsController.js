const pool = require("../db");

const getPaintings = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Paintings');
    const paintings = result.rows;

    res.json(paintings);

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getPaintings };
