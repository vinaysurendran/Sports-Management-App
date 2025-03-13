const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your MongoDB Atlas connection string
mongoose.connect('mongodb+srv://vinay:vinay@cluster0.cxw9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Team Schema
const teamSchema = new mongoose.Schema({
  name: String,
  league: String, // 'ASL' or 'APL'
  players: [String],
});

// Match Schema
const matchSchema = new mongoose.Schema({
  team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  league: String,
  team1Score: Number,
  team2Score: Number,
  status: { type: String, default: 'scheduled' }, // 'scheduled' or 'completed'
});

const Team = mongoose.model('Team', teamSchema);
const Match = mongoose.model('Match', matchSchema);

// Create a team
app.post('/api/teams', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).send(team);
});

// Get all teams (filter by league optional)
app.get('/api/teams', async (req, res) => {
  const { league } = req.query;
  const teams = await Team.find(league ? { league } : {});
  res.send(teams);
});

// Generate schedule for a league
app.post('/api/generate-schedule', async (req, res) => {
  const { league } = req.body;
  const teams = await Team.find({ league });
  const matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        team1: teams[i]._id,
        team2: teams[j]._id,
        league,
        status: 'scheduled',
      });
    }
  }
  await Match.insertMany(matches);
  res.status(201).send(matches);
});

// Get all matches (filter by league optional)
app.get('/api/matches', async (req, res) => {
  const { league } = req.query;
  const matches = await Match.find(league ? { league } : {}).populate('team1 team2');
  res.send(matches);
});

// Update match scores
app.patch('/api/matches/:id', async (req, res) => {
  const { team1Score, team2Score } = req.body;
  const match = await Match.findById(req.params.id);
  match.team1Score = team1Score;
  match.team2Score = team2Score;
  match.status = 'completed';
  await match.save();
  res.send(match);
});

// Get standings for a league
app.get('/api/standings', async (req, res) => {
  const { league } = req.query;
  const teams = await Team.find({ league });
  const matches = await Match.find({ league, status: 'completed' });

  const standings = teams.map(team => {
    let points = 0;
    matches.forEach(match => {
      if (match.team1.toString() === team._id.toString()) {
        if (match.team1Score > match.team2Score) points += 3;
        else if (match.team1Score === match.team2Score) points += 1;
      } else if (match.team2.toString() === team._id.toString()) {
        if (match.team2Score > match.team1Score) points += 3;
        else if (match.team2Score === match.team1Score) points += 1;
      }
    });
    return { team: team.name, points };
  });

  standings.sort((a, b) => b.points - a.points);
  res.send(standings);
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));