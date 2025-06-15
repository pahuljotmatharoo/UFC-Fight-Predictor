import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import Result_card from './result-card';
import { useNavigate } from 'react-router-dom';
import './results.css'

export default function Results({LoggedIn}) {
  const navigate = useNavigate();
  var load = false;
  var function_call = false;
  console.log(LoggedIn);
  useEffect(() => {
    if(LoggedIn === 0 && !load) {
    alert("Not Logged in!");
    load = true;
    navigate("/");
  }}
) 

  const [Data, setData] = useState([]);
  const get_record = async() => {
    const response = await fetch(`http://127.0.0.1:5000/results/${LoggedIn}`, {
      method: 'GET',
    })
    var data = await response.json();
    setData(data.result);
  }

  useEffect(() => {
    if(!function_call) {
    get_record();
    function_call = true;
    }
  },[LoggedIn]);

  return (
    <div className='results-page'>
      <div className='results-components'>
        <h1>Fight Results</h1>
        {Data.map((fight) =>
        <Result_card fighter1={fight.Fighter1}
          fighter2={fight.Fighter2}
          percentage1={fight.Percentage1}
          percentage2={fight.Percentage2}
          winner={fight.Winner}></Result_card>
        )}
      </div>
    </div>
  );
}