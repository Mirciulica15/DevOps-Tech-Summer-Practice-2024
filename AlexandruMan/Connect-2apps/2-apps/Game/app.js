const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const choices = ['rock', 'paper', 'scissors'];

// Determine the winner of the game
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'Draw';
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) return 'Player';
  return 'Computer';
}

// POST endpoint to handle the game logic
app.post('/play', async (req, res) => {
  const { playerName, playerChoice } = req.body;

  // Generate a random computer choice
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const winner = determineWinner(playerChoice, computerChoice);

  if (winner === 'Player') {
    // Send result to the leaderboard app
    try {
      await axios.post('http://localhost:4000/update', { playerName });
    } catch (error) {
      console.error('Failed to update leaderboard', error);
    }
  }

  res.json({ winner, computerChoice });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Rock Paper Scissors game app listening on port ${port}`);
});
