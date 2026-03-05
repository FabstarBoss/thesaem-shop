import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).end();
  try {
    const { userId } = jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET);
    const { rows } = await sql`
      SELECT * FROM bonus_history WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 20`;
    const { rows: [user] } = await sql`SELECT bonus_points FROM users WHERE id = ${userId}`;
    res.json({ balance: user.bonus_points, history: rows });
  } catch (e) { res.status(500).json({ error: e.message }); }
}
