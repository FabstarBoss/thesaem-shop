import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { slug } = req.query;
  try {
    const { rows } = await sql`SELECT * FROM products WHERE slug = ${slug}`;
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
}
