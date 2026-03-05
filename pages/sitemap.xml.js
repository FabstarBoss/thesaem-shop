import { sql } from '@vercel/postgres';

export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const base = 'https://thesaemcosmetic.ru';
  
  let productSlugs = [];
  try {
    const { rows } = await sql`SELECT slug FROM products WHERE in_stock = true`;
    productSlugs = rows.map(r => r.slug);
  } catch {}

  const staticPages = ['', '/catalog', '/blog', '/about', '/delivery', '/payment', '/faq', '/bonus'];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url><loc>${base}${p}</loc><changefreq>weekly</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
${productSlugs.map(s => `  <url><loc>${base}/product/${s}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
  return { props: {} };
}
