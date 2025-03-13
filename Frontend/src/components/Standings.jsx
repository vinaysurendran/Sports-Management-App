import { useState, useEffect } from 'react';
import axios from 'axios';

function Standings() {
  const [standingsASL, setStandingsASL] = useState([]);
  const [standingsAPL, setStandingsAPL] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const responseASL = await axios.get('/api/standings?league=ASL');
      setStandingsASL(responseASL.data);
      const responseAPL = await axios.get('/api/standings?league=APL');
      setStandingsAPL(responseAPL.data);
    };
    fetchStandings();
  }, []);

  return (
    <div>
      <h2>Standings</h2>
      <h3>ASL</h3>
      <table style={{ borderCollapse: 'collapse', width: '50%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>Team</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {standingsASL.map((standing, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{standing.team}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>APL</h3>
      <table style={{ borderCollapse: 'collapse', width: '50%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>Team</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {standingsAPL.map((standing, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{standing.team}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Standings;