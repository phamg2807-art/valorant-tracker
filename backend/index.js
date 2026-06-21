// index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// === YOUR TRACKER NETWORK API KEY ===
const TRACKER_API_KEY = '9af19bf6-7e4b-41e0-8f3d-f39a3abb0e4b';

// === MATCH HISTORY ENDPOINT ===
app.get('/api/match-history/:username/:tag', async (req, res) => {
  const { username, tag } = req.params;
  const riotId = encodeURIComponent(`${username}#${tag}`);
  const url = `https://public-api.tracker.gg/v2/valorant/standard/profile/riot/${riotId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'TRN-Api-Key': TRACKER_API_KEY
      }
    });

    // Extract matches (may need to adjust based on actual API response structure)
    const matches = response.data.data.matches || [];
    res.json({ matches });
  } catch (error) {
    // Log the real error for debugging
    if (error.response) {
      console.error('API ERROR:', error.response.data);
      res.status(500).json({ error: error.response.data.message || 'Failed to fetch match history' });
    } else {
      console.error('ERROR:', error.message);
      res.status(500).json({ error: 'Failed to fetch match history' });
    }
  }
});

// === ROOT ENDPOINT (OPTIONAL) ===
app.get('/', (req, res) => {
  res.send('Valorant Match History Tracker API is running.');
});

// === START SERVER ===
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
