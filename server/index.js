
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
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

// Digio API Configuration
const DIGIO_API_URL = process.env.DIGIO_API_URL;
const DIGIO_API_KEY = process.env.DIGIO_API_KEY;

// API Route
app.post('/api/submit-client-form', async (req, res) => {
  try {
    const formData = req.body;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});