import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login_page from './components/auth/Login';
import Register_page from './components/auth/register';
import Predictor from './components/predictor/predictor';
import Results from './components/results/results';
import Account_info from './components/auth/account_info';
import Change_username from './components/account-details/change_username';
import Change_password from './components/account-details/change_password';
import UFC_logo from '../src/assets/UFC_Logo.png';
import user_logo from '../src/assets/user.png';
import UfcButton from './components/small-components/ufcbutton';
import { useState } from 'react';
//gonna add a API key per user
function App() {
  
  const [LoggedIn, setLoggedIn] = useState(0);
  const [API_KEY, setAPI_KEY] = useState("0");

  //logout function, async as we need to await for fetch and response
  const logOut = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/logout/${API_KEY}?user_id=${encodeURIComponent(LoggedIn)}`, {
        method: 'GET'
      })
      let data = await response.json();
      if(response.status === 400) {
        alert("Invalid API Key");
      }
      console.log(data);
      setLoggedIn(0);
    }
    catch {
      alert("Backend Server is down!");
    }
  }

  return (
    <div className='landing-page'>
    <Router>
        <nav className="navbar" role="navigation" aria-label="Main">
          
          <div className="navbar__brand">
            <Link to="/">
            <img src={UFC_logo} alt="UFC Logo" />
            </Link>
          </div>

          <ul className="navbar__links">
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            {LoggedIn === 0 ? (
              <>
              </>
              ) : (
              <>
                <li><Link to="/predictor">Predictor</Link></li>
                <li><Link to="/results">Previous Results</Link></li>
              </>
            )}
          </ul>

          <div className="navbar__user-controls">
            {LoggedIn != 0 ? <Link to="/account_info">
            <img src={user_logo} alt="User Avatar" className="user" />
            </Link>
            : null}
            
            {LoggedIn != 0 ? <UfcButton id="logout-button" click={logOut}>Logout</UfcButton>
            : null}
          </div>

        </nav>
        
      <Routes>
        <Route path="/" element={<Login_page setLoggedIn={setLoggedIn} setAPI_KEY={setAPI_KEY} />} />
        <Route path="/register" element={<Register_page />} />
        <Route path="/predictor" element={<Predictor LoggedIn={LoggedIn} API_KEY={API_KEY} />} />
        <Route path="/results" element={<Results LoggedIn={LoggedIn} API_KEY={API_KEY} />} />
        <Route path="/account_info" element={<Account_info LoggedIn={LoggedIn} API_KEY={API_KEY} setLoggedIn={setLoggedIn}/>} />
        <Route path="/change_username" element={<Change_username LoggedIn={LoggedIn} API_KEY={API_KEY}/>}/>
        <Route path="/change_password" element={<Change_password LoggedIn={LoggedIn} API_KEY={API_KEY}/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
