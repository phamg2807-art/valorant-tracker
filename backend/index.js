// backend/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const TRACKER_API_KEY = 'YOUR_TRACKER_API_KEY'; // Replace with your Tracker Network API key

app.get('/api/match-history/:username/:tag', async (req, res) => {
  const { username, tag } = req.params;
  try {
    // Build the Tracker Network API URL
    const riotId = encodeURIComponent(`${username}#${tag}`);
    const url = `https://public-api.tracker.gg/v2/valorant/standard/profile/riot/${riotId}`;

    const response = await axios.get(url, {
      headers: {
        'TRN-Api-Key': TRACKER_API_KEY,
      },
    });

    // Extract match history (customize as needed)
    const matches = response.data.data.matches || [];
    res.json({ matches });
  } catch (error) {
    // Log error for debugging
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
