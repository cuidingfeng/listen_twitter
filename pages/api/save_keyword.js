// api/your-api-route.js

import pool from '../../lib/db';

export default async function save_keyword(req, res) {
    try {
        const { keyword, u_id } = req.body;
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('INSERT INTO rules (keyword, u_id) VALUES (?, ?)', [keyword, u_id]);
        connection.release();
        connection.end();
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
