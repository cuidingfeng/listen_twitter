// api/your-api-route.js

import pool from '../../lib/db';

export default async function delete_keyword(req, res) {
    try {
        const { keyword, u_id } = req.body;
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('DELETE FROM twitter_user WHERE keyword = ? AND u_id = ?', [keyword, u_id]);
        connection.release();
        connection.end();
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
