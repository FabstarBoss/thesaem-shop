import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { userId } = jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET);
    const { rows } = await sql`
      SELECT id, email, name, phone, bonus_points, created_at FROM users WHERE id = ${userId}`;
    res.json(rows[0]);
  } catch { res.status(401).json({ error: 'Invalid token' }); }
}
