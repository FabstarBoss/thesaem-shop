import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  try {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!rows[0]) return res.status(401).json({ error: 'Неверный email или пароль' });
    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: 'Неверный email или пароль' });
    const token = jwt.sign({ userId: rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: rows[0].id, email: rows[0].email, name: rows[0].name, bonus_points: rows[0].bonus_points } });
  } catch (e) { res.status(500).json({ error: e.message }); }
}
