
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
const { z } = require('zod');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// If behind a proxy (e.g., Render), trust it so correct proto/host are detected
app.set('trust proxy', 1);

// Configure CORS to properly respond to preflight requests
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://wiseglobalresearch-services.web.app',
  'https://wiseglobalresearch.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl) or from allowed list
    if (!origin || allowedOrigins.includes(origin) || /onrender\.com$/.test(new URL(origin).hostname)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Rate limiter: limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Initialize Firebase Admin for verifying ID tokens
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

// Middleware to require a valid Firebase ID token; restrict to admin users
const requireAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, error: { message: 'Missing bearer token' } });
    const decoded = await admin.auth().verifyIdToken(token);
    let isAdmin = decoded.admin === true;
    if (!isAdmin) {
      try {
        const snap = await admin.database().ref(`admins/${decoded.uid}`).get();
        isAdmin = snap.exists() && snap.val() === true;
      } catch (_) {
        isAdmin = false;
      }
    }
    if (!isAdmin) return res.status(403).json({ success: false, error: { message: 'Admin only' } });
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, error: { message: 'Invalid token' } });
  }
};

// Digio API Configuration
const DIGIO_API_URL = process.env.DIGIO_API_URL;
const DIGIO_API_KEY = process.env.DIGIO_API_KEY;

// Schema for client form payload
const clientFormSchema = z.object({
  clientName: z.string().min(1),
  address: z.string().min(1),
  dob: z.string().min(1),
  pan: z.string().min(1),
  email: z.string().email(),
  clientId: z.string().optional(),
});

// API Route (admin-only)
app.post('/api/submit-client-form', requireAdminAuth, async (req, res) => {
  try {
    const parse = clientFormSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, error: { message: 'Invalid payload', issues: parse.error.flatten() } });
    }
    const formData = parse.data;

    // Prepare payload for Digio API
    const postData = {
      signers: [
        {
          identifier: formData.email,
          name: formData.clientName,
          sign_type: "aadhaar"
        }
      ],
      expire_in_days: 10,
      send_sign_link: true,
      notify_signers: true,
      will_self_sign: false,
      display_on_page: "custom",
      file_name: `${formData.clientName}.pdf`,
      templates: [
        {
          template_key: "TMP250409085749067X19LUJRRQRYTGK",
          template_values: {
            "client full name": formData.clientName,
            "clientId": formData.clientId || "NA",
            "address": formData.address,
            "dob": formData.dob,
            "pan": formData.pan,
            "email": formData.email
          }
        }
      ]
    };

    // Make request to Digio API
    const response = await axios.post(DIGIO_API_URL, postData, {
      headers: {
        'Accept': 'application/json',
        'Authorization': DIGIO_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    // Send success response
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    // Send error response
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data || { message: 'Server error' }
    });
  }
});

// Simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Basic economic events endpoint (mock data or pass-through when url is provided and whitelisted server-side)
app.get('/api/economic', async (req, res) => {
  try {
    const { url } = req.query;
    // If you later add whitelist + fetch real data, do it here. For now return mock events.
    const now = Date.now();
    const countries = ['IN', 'US', 'EU', 'GB', 'JP'];
    const titles = ['CPI (YoY)', 'GDP Growth Rate', 'Retail Sales MoM', 'Unemployment Rate', 'Trade Balance'];
    const out = Array.from({ length: 10 }).map((_, i) => {
      const t = new Date(now + (i + 1) * (30 + Math.floor(Math.random() * 90)) * 60000);
      const prev = (Math.random() * 5).toFixed(1) + '%';
      const consensus = (parseFloat(prev) + (Math.random() * 2 - 1)).toFixed(1) + '%';
      const actual = (parseFloat(consensus) + (Math.random() * 2 - 1)).toFixed(1) + '%';
      return {
        id: `srv-${now}-${i}`,
        date: t.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        time: t.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
        isoTime: t.toISOString(),
        country: countries[i % countries.length],
        title: titles[i % titles.length],
        impact: Math.ceil(Math.random() * 3),
        previous: prev,
        consensus,
        actual,
      };
    });
    res.json(out);
  } catch (e) {
    res.status(500).json({ error: 'failed to load economic data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});