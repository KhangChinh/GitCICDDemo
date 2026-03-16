const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get server info
app.get('/api/info', (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: Math.floor(os.uptime()),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryUsage: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
