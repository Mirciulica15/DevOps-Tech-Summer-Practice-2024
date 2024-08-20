const express = require('express');
const app = express();

// Store leaderboard data in memory (simple object)
let leaderboard = {};

app.use(express.json());

// Endpoint to update the leaderboard
app.post('/update', (req, res) => {
  const { playerName } = req.body;

  // Update the leaderboard
  if (!leaderboard[playerName]) {
    leaderboard[playerName] = 0;
  }
  leaderboard[playerName]++;

  res.send('Leaderboard updated');
});

// Serve the leaderboard in an HTML page
app.get('/', (req, res) => {
  let leaderboardHTML = '<h1>Leaderboard</h1><ul>';
  for (const player in leaderboard) {
    leaderboardHTML += `<li>${player}: ${leaderboard[player]} wins</li>`;
  }
  leaderboardHTML += '</ul>';
  res.send(leaderboardHTML);
});

// Start the leaderboard server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Leaderboard app listening on port ${port}`);
});
