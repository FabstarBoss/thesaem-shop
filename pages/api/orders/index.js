import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, address, deliveryType, paymentType, items, total, bonusUsed, comment, token } = req.body;
    let userId = null;
    if (token) {
      try { const d = jwt.verify(token, process.env.JWT_SECRET); userId = d.userId; } catch {}
    }
    const orderNum = 'TS' + Date.now().toString().slice(-8);
    const bonusEarned = Math.floor(total * 0.01);
    try {
      const { rows: [order] } = await sql`
        INSERT INTO orders (order_number, user_id, user_name, user_email, user_phone,
          delivery_address, delivery_type, payment_type, total_amount, bonus_used, bonus_earned, comment)
        VALUES (${orderNum}, ${userId}, ${name}, ${email}, ${phone},
          ${address||''}, ${deliveryType}, ${paymentType}, ${total}, ${bonusUsed||0}, ${bonusEarned}, ${comment||''})
        RETURNING *`;
      for (const item of items) {
        await sql`INSERT INTO order_items (order_id, product_name, product_image, price, quantity)
          VALUES (${order.id}, ${item.name}, ${item.img||''}, ${item.price}, ${item.qty})`;
      }
      if (userId) {
        await sql`UPDATE users SET bonus_points = bonus_points + ${bonusEarned} - ${bonusUsed||0} WHERE id = ${userId}`;
        await sql`INSERT INTO bonus_history (user_id, amount, type, description)
          VALUES (${userId}, ${bonusEarned}, 'earned', ${'Заказ ' + orderNum})`;
      }
      res.json({ success: true, orderNumber: orderNum, bonusEarned });
    } catch (e) { res.status(500).json({ error: e.message }); }
  }

  if (req.method === 'GET') {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).end();
    try {
      const { userId } = jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET);
      const { rows } = await sql`
        SELECT o.*, json_agg(json_build_object('name',oi.product_name,'price',oi.price,'qty',oi.quantity,'img',oi.product_image)) as items
        FROM orders o LEFT JOIN order_items oi ON oi.order_id = o.id
        WHERE o.user_id = ${userId}
        GROUP BY o.id ORDER BY o.created_at DESC`;
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  }
}
