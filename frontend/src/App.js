import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login_page from './components/auth/Login';
import Register_page from './components/auth/register';
import Predictor from './components/predictor/predictor';
import Results from './components/results/results';
import Account_info from './components/auth/account_info';
import Change_username from './components/account-details/change_username';
import Change_password from './components/account-details/change_password';
import { useState } from 'react';

function App() {
  const [LoggedIn, setLoggedIn] = useState(0);
  return (
    <div className='landing-page'>
    <Router>
      <nav className="navbar">
        <ul className="nav-links">
            {LoggedIn === 0 ? (
              <>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/predictor">Predictor</Link></li>
                <li><Link to="/results">Previous Results</Link></li>
                <li><Link to="/account_info">Account Information</Link></li>
              </>
            )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Login_page setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register_page />} />
        <Route path="/predictor" element={<Predictor LoggedIn={LoggedIn} />} />
        <Route path="/results" element={<Results LoggedIn={LoggedIn} />} />
        <Route path="/account_info" element={<Account_info LoggedIn={LoggedIn}/>} />
        <Route path="/change_username" element={<Change_username LoggedIn={LoggedIn}/>}/>
        <Route path="/change_password" element={<Change_password LoggedIn={LoggedIn}/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
