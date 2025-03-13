import { useState } from 'react';
import axios from 'axios';

function RegisterTeam() {
  const [name, setName] = useState('');
  const [league, setLeague] = useState('ASL');
  const [players, setPlayers] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamData = {
      name,
      league,
      players: players.split(',').map(p => p.trim()),
    };
    await axios.post('/api/teams', teamData);
    alert('Team registered successfully!');
    setName('');
    setPlayers('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <h2>Register Team</h2>
      <label>
        Team Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        League:
        <select value={league} onChange={e => setLeague(e.target.value)}>
          <option value="ASL">ASL</option>
          <option value="APL">APL</option>
        </select>
      </label>
      <label>
        Players (comma-separated):
        <textarea value={players} onChange={e => setPlayers(e.target.value)} required />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
export default RegisterTeam;