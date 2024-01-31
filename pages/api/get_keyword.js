// api/your-api-route.js

import pool from '../../lib/db';

export default async function get_keyword(req, res) {
    try {
        const { u_id } = req.query;
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM rules WHERE u_id=' + u_id);
        connection.release();
        connection.end();
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
