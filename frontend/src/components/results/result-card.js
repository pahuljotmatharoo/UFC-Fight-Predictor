import React from 'react'
import './result-card.css'

export default function Result_Card({ fighter1, fighter2, percentage1, percentage2, winner,}) 
{
  const isF1Winner = winner === fighter1

  return (
    <div className="result-card">
      <div className="result-top">
        <div className="card fighter-red">
          <h2>{fighter1}</h2>
          <p className="percentage">{percentage1.toFixed(1)}%</p>
        </div>

        <div className="vs">VS</div>

        <div className="card fighter-blue">
          <h2>{fighter2}</h2>
          <p className="percentage">{percentage2.toFixed(1)}%</p>
        </div>
      </div>

      <div className="result-bottom">
        <h3>
          Winner:{' '}
          <span className={`winner-name ${isF1Winner ? 'red' : 'blue'}`}>
            {winner}
          </span>
        </h3>
      </div>
    </div>
  )
}
