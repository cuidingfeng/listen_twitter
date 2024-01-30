// api/your-api-route.js

import pool from '../../lib/db';

export default async function handler(req, res) {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM rules');
        connection.release();
        connection.end();
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
