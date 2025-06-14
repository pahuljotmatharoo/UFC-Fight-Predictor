import { useEffect, useState , useRef } from 'react';
import './predictor.css'
import { useNavigate } from 'react-router-dom';
import UfcButton from '../small-components/ufcbutton';
import LoadingDots from '../small-components/loading';
import LoadingDots_Blue from '../small-components/loading_blue';
import Result_card from '../results/result-card';

// useeffect basically just either runs on every render of the site, or when the variable that we call the effect on changes.

//TODO (doable after rest of functionality)
//add loading, i wanna do 3 dots this time instead of a spinner
//make a common selectbox component
//update the inital state of fighters depending on which weightclass is selected

//we need a fetch for the weight class
const weight_class = async (weightclass, select_red, select_blue) => {
  const response = await fetch(`http://127.0.0.1:5000/get_names/${weightclass}`, {
        method: 'GET',
        });
        var data = await response.json();
        if(response.status === 200) {

          //delete prev data
          select_blue.innerHTML = '';
          select_red.innerHTML = '';

          for(var i = 0; i < data.length; i++) {
            var option_b = document.createElement('option');
            option_b.text = data[i];
            option_b.value = data[i];
            select_blue.append(option_b);

            var option_r = document.createElement('option');
            option_r.text = data[i];
            option_r.value = data[i];
            select_red.append(option_r);
          }
      }
}

const fight_predict = async (fighter1, fighter2, accountid, SetData, setLoading, Loading, setPredicted) => {
  if(Loading) {
    alert("Already predicting...");
    return;
  }
  setPredicted(true);
  setLoading(true);
  const formBody = new URLSearchParams({
            fighter1: fighter1,
            fighter2: fighter2,
            accountid: accountid
        }).toString();

  const response = await fetch(`http://127.0.0.1:5000/predictor`, {
    method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: formBody
  })
  let data = await response.json();
  SetData(data);
  setLoading(false);
}

export default function Predictor({LoggedIn}) {
  const [Predicted, setPredicted] = useState(false);
  const [Loading, setLoading] = useState(false);
  const select_weightclass_Ref = useRef();
  const fighter1_raw = useRef();
  const fighter2_raw = useRef();
  const [Fighter1, setFighter1] = useState("");
  const [Fighter2, setFighter2] = useState("");
  const [Data, SetData] = useState({
    B_height: '',
    B_reach: '',
    R_height: '',
    R_reach: '',
    B_age: '',
    R_age: '',
    B_wins: '',
    B_draws: '',
    B_losses: '',
    R_wins: '',
    R_draws: '',
    R_losses: '',
    B_strikes: '',
    R_strikes: '',
    B_takesdowns: '',
    R_takedowns: '',
    percentage_loser: '',
    percentage_winner:'',
    Winner: ''
  });
  const navigate = useNavigate();
  let NoRepeat = false;

  //runs on every render of the page
  useEffect(() => {
    if(LoggedIn === 0 && !NoRepeat) {
      NoRepeat = true;
      navigate("/");
      alert("Not Logged in!");
  }});

  function handleChange_weightclass() {
    const value = select_weightclass_Ref.current.value;
    let select_red = document.getElementsByClassName('select-fighter-red')[0];
    let select_blue = document.getElementsByClassName('select-fighter-blue')[0];
    let call = weight_class(String(value), select_red, select_blue);
  }

  function handle_fighter1(){
    const value = fighter1_raw.current.value;
    setFighter1(value);
  }

  function handle_fighter2(){
    const value = fighter2_raw.current.value;
    setFighter2(value);
  }

  return (
    <>
    <div className='predictor-page'>
      <div className="predictor-container">
          <h1 className='predictor-title'>UFC Fight Predictor</h1>
          <p>Predict UFC Fights with great accuracy!</p>
          <p>Select a weight class!</p>
          <select onChange={handleChange_weightclass} ref={select_weightclass_Ref}>
            <option value = "125">Flyweight</option>
            <option value = "135">Bantamweight</option>
            <option value = "145">Featherweight</option>
            <option value = "155">Lightweight</option>
            <option value = "170">Welterweight</option>
            <option value = "185">Middleweight</option>
            <option value = "205">Light Heavyweight</option>
            <option value = "265">Heavyweight</option>
          </select>
          {/* Corners */}
          <section className="corners">
            <div className="corner red">
              <h2 className='red-h2'>Red Corner (Favourite)</h2>
              <select className='select-fighter-red' onChange={handle_fighter1} ref={fighter1_raw}>
                  <option>Select a fighter!</option>
              </select>

              <h3 className="fighter-name">{Fighter1}</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-value">{Loading ? <LoadingDots></LoadingDots> : Data.R_height} inches</span>
                  <span className="stat-label">Height</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{Loading ? <LoadingDots></LoadingDots> : Data.R_reach} inches</span>
                  <span className="stat-label">Reach</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{Loading ? <LoadingDots></LoadingDots> : Data.R_age}</span>
                  <span className="stat-label">Age</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{Loading ? <LoadingDots></LoadingDots> : Data.R_wins}</span>
                  <span className="stat-label">Record</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{ Loading ? <LoadingDots></LoadingDots> : Data.R_strikes}</span>
                  <span className="stat-label">Significant Strikes per 10 mins</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{ Loading ? <LoadingDots></LoadingDots> : Data.R_takedowns}</span>
                  <span className="stat-label">Takedowns per 10 mins</span>
                </div>
              </div>
            </div>

            <div className="vs-circle">VS</div>

            <div className="corner blue">
              <h2 className='blue-h2'>Blue Corner (Underdog)</h2>
              <select className='select-fighter-blue' onChange={handle_fighter2} ref={fighter2_raw}>
                  <option>Select a fighter!</option>
              </select>
              <h3 className="fighter-name">{Fighter2}</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-value">{ Loading ? <LoadingDots_Blue></LoadingDots_Blue> : Data.B_height} inches</span>
                  <span className="stat-label">Height</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{ Loading ? <LoadingDots_Blue></LoadingDots_Blue> : Data.B_reach} inches</span>
                  <span className="stat-label">Reach</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{ Loading ? <LoadingDots_Blue></LoadingDots_Blue> : Data.B_age}</span>
                  <span className="stat-label">Age</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{ Loading ? <LoadingDots_Blue></LoadingDots_Blue> : Data.B_wins}</span>
                  <span className="stat-label">Record</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{ Loading ? <LoadingDots_Blue></LoadingDots_Blue> : Data.B_strikes}</span>
                  <span className="stat-label">Significant Strikes per 10 mins</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{Loading ? <LoadingDots_Blue></LoadingDots_Blue> : Data.B_takedowns}</span>
                  <span className="stat-label">Takedowns per 10 mins</span>
                </div>
              </div>
            </div>
          </section>

          {/* Predict Button */}
          <UfcButton click={() => fight_predict(Fighter1,Fighter2,LoggedIn, SetData, setLoading, Loading, setPredicted)}>
            {"⚡ Predict Winner"}
            </UfcButton>      
          {/* Result */}
          <section className="result">
            <div className="winner-card">
              <h3>WINNER: {Loading ? <LoadingDots></LoadingDots> : Data.Winner}</h3>
              <p>
                WIN PROBABILITY: <strong>{ Loading ? <LoadingDots></LoadingDots> : String(Math.round(Data.percentage_winner * 100 * 100) / 100)}%</strong>
              </p>
              <div className="probabilities">
              <div className="prob red-outline">
                {Fighter1 === Data.Winner ? Fighter1 : Fighter2 }: { Loading ? <LoadingDots></LoadingDots> : Math.round(Data.percentage_winner * 100 * 100) / 100}%
              </div>
              <div className="prob blue-outline">
                {Fighter1 === Data.Winner ? Fighter2 : Fighter1 }: { Loading ? <LoadingDots></LoadingDots> : Math.round(Data.percentage_loser * 100 * 100) / 100}%
              </div>
            </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}