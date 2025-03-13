import { useState, useEffect } from 'react';
import axios from 'axios';

function Matches() {
  const [matches, setMatches] = useState([]);
  const [league, setLeague] = useState('ASL');

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await axios.get(`/api/matches?league=${league}`);
      setMatches(response.data);
    };
    fetchMatches();
  }, [league]);

  const handleGenerateSchedule = async () => {
    await axios.post('/api/generate-schedule', { league });
    const response = await axios.get(`/api/matches?league=${league}`);
    setMatches(response.data);
  };

  const handleUpdateScore = async (matchId, team1Score, team2Score) => {
    await axios.patch(`/api/matches/${matchId}`, { team1Score, team2Score });
    const response = await axios.get(`/api/matches?league=${league}`);
    setMatches(response.data);
  };

  return (
    <div>
      <h2>Matches</h2>
      <label>
        League:
        <select value={league} onChange={e => setLeague(e.target.value)}>
          <option value="ASL">ASL</option>
          <option value="APL">APL</option>
        </select>
      </label>
      <button onClick={handleGenerateSchedule} style={{ marginLeft: '10px' }}>
        Generate Schedule for {league}
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {matches.map(match => (
          <li key={match._id} style={{ margin: '10px 0' }}>
            {match.team1.name} vs {match.team2.name} - 
            {match.status === 'completed' ? ` ${match.team1Score} - ${match.team2Score}` : ' Scheduled'}
            {match.status === 'scheduled' && (
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  const team1Score = e.target.team1Score.value;
                  const team2Score = e.target.team2Score.value;
                  handleUpdateScore(match._id, team1Score, team2Score);
                }}
                style={{ display: 'inline', marginLeft: '10px' }}
              >
                <input type="number" name="team1Score" placeholder="Team 1 Score" required style={{ width: '80px' }} />
                <input type="number" name="team2Score" placeholder="Team 2 Score" required style={{ width: '80px' }} />
                <button type="submit">Update</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Matches;