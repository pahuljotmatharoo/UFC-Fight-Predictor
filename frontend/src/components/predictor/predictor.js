import './predictor.css'

export default function Predictor() {
    return (
<>
      <div className="container">
        {/* Corners */}
        <section className="corners">
          <div className="corner red">
            <h2>Red Corner</h2>
            <select className='select-fighter'>
                <option>Select a fighter!</option>
            </select>

            <h3 className="fighter-name">Islam Makhachev</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">177.8 cm</span>
                <span className="stat-label">Height</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">177.8 cm</span>
                <span className="stat-label">Reach</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">32</span>
                <span className="stat-label">Age</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">Southpaw</span>
                <span className="stat-label">Stance</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">13</span>
                <span className="stat-label">Win Streak</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">3</span>
                <span className="stat-label">KO Wins</span>
              </div>
            </div>
          </div>

          <div className="vs-circle">VS</div>

          <div className="corner blue">
            <h2>Blue Corner</h2>
            <select className='select-fighter'>
                <option>Select a fighter!</option>
            </select>
            <h3 className="fighter-name">Ilia Topuria</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">170.18 cm</span>
                <span className="stat-label">Height</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">175.26 cm</span>
                <span className="stat-label">Reach</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">27</span>
                <span className="stat-label">Age</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">Orthodox</span>
                <span className="stat-label">Stance</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">7</span>
                <span className="stat-label">Win Streak</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">4</span>
                <span className="stat-label">KO Wins</span>
              </div>
            </div>
          </div>
        </section>

        {/* Predict Button */}
        <button className="predict-btn">
          ⚡ Predict Winner
        </button>

        {/* Result */}
        <section className="result">
          <div className="winner-card">
            <h3>Ilia Topuria</h3>
            <p>
              WIN PROBABILITY: <strong>60.9%</strong>
            </p>
          </div>
          <div className="probabilities">
            <div className="prob red-outline">
              Islam Makhachev: 39.1%
            </div>
            <div className="prob blue-outline">
              Ilia Topuria: 60.9%
            </div>
          </div>
        </section>
      </div>
</>
    );
}