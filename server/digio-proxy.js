const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));

// Basic security headers (lightweight)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  if (process.env.NODE_ENV === 'production') res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  next();
});

// CORS configuration
const configuredOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (configuredOrigins.length === 0) {
      if (origin.includes('localhost') || process.env.NODE_ENV !== 'production') return callback(null, true);
      return callback(new Error('CORS not allowed'), false);
    }
    if (configuredOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed by configuration'), false);
  }
};

app.use((req, res, next) => {
  cors(corsOptions)(req, res, (err) => {
    if (err) {
      console.warn('CORS rejection:', err.message || err);
      res.status(403).json({ error: 'CORS blocked' });
      return;
    }
    next();
  });
});

// Simple in-memory rate limiter
const rateWindowMs = 15 * 60 * 1000; // 15 minutes
const maxRequestsPerWindow = parseInt(process.env.RATE_LIMIT_MAX || '200', 10);
const ipCounters = new Map();
app.use((req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = ipCounters.get(ip) || { count: 0, start: now };
    if (now - entry.start > rateWindowMs) {
      entry.count = 1;
      entry.start = now;
    } else {
      entry.count += 1;
    }
    ipCounters.set(ip, entry);
    res.setHeader('X-RateLimit-Limit', maxRequestsPerWindow);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequestsPerWindow - entry.count));
    if (entry.count > maxRequestsPerWindow) {
      return res.status(429).json({ error: 'Too many requests' });
    }
  } catch (e) {
    // ignore
  }
  next();
});

const PORT = process.env.PORT || 3001;
const DIGIO_AUTH_BASIC = process.env.DIGIO_AUTH_BASIC; // must be set in server env
const NEWSAPI_KEY = process.env.NEWSAPI_KEY; // optional - for /api/news

if (!DIGIO_AUTH_BASIC) {
  console.warn('Warning: DIGIO_AUTH_BASIC is not set. The proxy will fail until you set it.');
}

// Serve React build when requested
if (process.env.NODE_ENV === 'production' || process.env.SERVE_STATIC === 'true') {
  const staticPath = path.join(__dirname, '..', 'build');
  app.use(express.static(staticPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

app.post('/api/digio', async (req, res) => {
  try {
    // Forward the client's payload to Digio with server-side credentials
    const digioResp = await fetch('https://api.digio.in/v2/client/template/multi_templates/create_sign_request', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${DIGIO_AUTH_BASIC}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await digioResp.text();
    let parsed;
    try { parsed = JSON.parse(data); } catch (e) { parsed = data; }

    const status = digioResp.ok ? 200 : digioResp.status || 500;
    return res.status(status).json({ success: digioResp.ok, data: parsed });
  } catch (err) {
    console.error('Digio proxy error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Proxy error' });
  }
});

// News proxy - keeps NewsAPI key on server
app.get('/api/news', async (req, res) => {
  try {
    if (!NEWSAPI_KEY) return res.status(500).json({ error: 'NEWSAPI_KEY not configured on server' });
    const q = encodeURIComponent(req.query.q || 'stock market OR nifty OR sensex OR sebi');
    const url = `https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWSAPI_KEY}`;
    const r = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } });
    const text = await r.text();
    let parsed;
    try { parsed = JSON.parse(text); } catch (e) { parsed = text; }
    return res.status(r.ok ? 200 : 500).json(parsed);
  } catch (err) {
    console.error('News proxy error:', err);
    return res.status(500).json({ error: err.message || 'News proxy error' });
  }
});

// Economic calendar proxy - pass-through or mock with host whitelist
app.get('/api/economic', async (req, res) => {
  const external = req.query.url;
  try {
    const whitelist = (process.env.ECONOMIC_WHITELIST || 'widget.myfxbook.com,myfxbook.com').split(',').map(s => s.trim()).filter(Boolean);
    if (!external) {
      const mock = Array.from({ length: 12 }).map((_, i) => ({
        id: `m-${i}`,
        isoTime: new Date(Date.now() + (i + 1) * 3600 * 1000).toISOString(),
        date: new Date(Date.now() + (i + 1) * 3600 * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        time: new Date(Date.now() + (i + 1) * 3600 * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
        country: ['IN','US','EU','GB','JP'][i % 5],
        title: ['CPI','GDP','Retail Sales','Unemployment','Trade Balance'][i % 5],
        impact: Math.ceil(Math.random() * 3),
        previous: (Math.random()*5).toFixed(1)+'%',
        consensus: (Math.random()*5).toFixed(1)+'%',
        actual: (Math.random()*5).toFixed(1)+'%'
      }));
      return res.json(mock);
    }

    let urlObj;
    try { urlObj = new URL(external); } catch (e) { return res.status(400).json({ error: 'Invalid URL' }); }
    const hostname = urlObj.hostname.replace(/^www\./, '');
    if (!whitelist.includes(hostname) && !whitelist.includes(urlObj.hostname)) {
      return res.status(400).json({ error: 'External host not allowed' });
    }
    const r = await fetch(external, { method: 'GET' });
    const data = await r.text();
    try { return res.status(r.ok ? 200 : 500).send(JSON.parse(data)); } catch(e) { return res.status(r.ok ? 200 : 500).send(data); }
  } catch (err) {
    console.error('Economic proxy error:', err);
    return res.status(500).json({ error: err.message || 'Economic proxy error' });
  }
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Digio proxy listening on http://localhost:${PORT}`));
