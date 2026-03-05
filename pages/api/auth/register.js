import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password, name, phone } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email и пароль обязательны' });
  try {
    const ex = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (ex.rows[0]) return res.status(400).json({ error: 'Email уже зарегистрирован' });
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await sql`
      INSERT INTO users (email, password_hash, name, phone, bonus_points)
      VALUES (${email}, ${hash}, ${name||''}, ${phone||''}, 100)
      RETURNING id, email, name, bonus_points`;
    await sql`INSERT INTO bonus_history (user_id, amount, type, description)
      VALUES (${rows[0].id}, 100, 'registration', 'Приветственные бонусы')`;
    const token = jwt.sign({ userId: rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: rows[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
}
