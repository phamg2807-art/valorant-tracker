const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*'
}));

const TRACKER_API_KEY = process.env.TRACKER_API_KEY;

app.get('/api/match-history/:username/:tag', async (req, res) => {
  const { username, tag } = req.params;
  try {
    const response = await axios.get(
      `https://public-api.tracker.gg/v2/valorant/standard/profile/riot/${encodeURIComponent(username)}%23${encodeURIComponent(tag)}/matches`,
      {
        headers: {
          'TRN-Api-Key': TRACKER_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
