// Optional simple sitemap generator script (node) for CRA builds
// Usage: node src/utils/generateSitemap.js > public/sitemap.xml

const routes = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/legal',
  '/disclosure',
  '/team',
  '/vision',
  '/blogs',
  '/market-news',
  '/research-reports',
  '/payment',
  '/terms',
  '/privacy',
  '/refund',
  '/complaint',
  '/grievance-redressal-process',
  '/guide',
  '/demo',
  '/user-login',
  '/client-panel',
  '/livechart',
  '/ticker',
  '/equity',
  '/intraday',
  '/mcx',
  '/services/equity/stock-option',
  '/services/equity/delivery',
  '/services/equity/index',
  '/services/equity/future',
  '/services/equity/stock-index-option',
  '/services/equity/btst',
  '/services/equity/cash',
  '/services/mcx/bullions',
  '/services/mcx/energy',
  '/services/mcx/metal',
  '/services/mcx/mcx-option',
  '/services/ncdex',
  '/services/forex',
  '/services/currency',
  '/services/comex',
  '/SmartCash',
  '/EvaluationIndexOptions',
  '/EvaluationStockCash',
  '/EvaluationStockOption',
  '/SmartFuture',
  '/SmartOptions',
  '/ImpulseIndexOptions',
  '/ImpulseOption',
  '/MCXSupreme',
  '/GalaxyMCX',
  '/UniversalCash',
  '/InfinityClub',
  '/investor-charter',
  '/anti-money-laundering',
  '/daily'
];

const BASE = 'https://wiseglobalresearch.com';
const lastmod = new Date().toISOString();

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((r) => `  <url>\n    <loc>${BASE}${r === '/' ? '/' : r}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`) 
  .join('\n')}\n</urlset>\n`;

process.stdout.write(xml);
