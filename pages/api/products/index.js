import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { category, search, page = 1, limit = 24, sort = 'default', price_from, price_to } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let conditions = ['in_stock = true'];
  let params = [];
  let i = 1;

  if (category) {
    conditions.push(`categories @> $${i}::jsonb`);
    params.push(JSON.stringify([category]));
    i++;
  }
  if (search) {
    conditions.push(`name ILIKE $${i}`);
    params.push(`%${search}%`);
    i++;
  }
  if (price_from) { conditions.push(`price >= $${i}`); params.push(parseInt(price_from)); i++; }
  if (price_to)   { conditions.push(`price <= $${i}`); params.push(parseInt(price_to)); i++; }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  let orderBy = 'id ASC';
  if (sort === 'price-asc')  orderBy = 'price ASC';
  if (sort === 'price-desc') orderBy = 'price DESC';
  if (sort === 'rating')     orderBy = 'rating DESC';

  try {
    const countParams = [...params];
    params.push(parseInt(limit), offset);

    const { rows } = await sql.query(
      `SELECT * FROM products ${where} ORDER BY ${orderBy} LIMIT $${i} OFFSET $${i+1}`,
      params
    );
    const { rows: cr } = await sql.query(
      `SELECT COUNT(*) FROM products ${where}`, countParams
    );
    res.json({ products: rows, total: parseInt(cr[0].count), page: parseInt(page) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
