import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RegisterTeam from './components/RegisterTeam';
import Matches from './components/Matches';
import Standings from './components/Standings';
import { Nav } from './components/Nav';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-team" element={<RegisterTeam />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;