// api/your-api-route.js

import pool from '../../lib/db';

export default async function save_user(req, res) {
    try {
        const { x_id, u_id } = req.body;
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('INSERT INTO twitter_user (x_id, u_id) VALUES (?, ?)', [x_id, u_id]);
        connection.release();
        connection.end();
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
