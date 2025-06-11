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

export default function Results(LoggedIn) {
  const [Data, setData] = useState([]);
  const get_record = async() => {
    const response = await fetch(`http://127.0.0.1:5000/results/${LoggedIn.LoggedIn}`, {
      method: 'GET',
    })
    var data = await response.json();
    setData(data.result);
  }

  useEffect(() => {
     var call = get_record();
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fighter 1 (RED)</TableCell>
            <TableCell align="left">Fighter 2 (BLUE)</TableCell>
            <TableCell align="left">Percentage 1 (RED)</TableCell>
            <TableCell align="left">Percentage 2 (BLUE)</TableCell>
            <TableCell align="left">Winner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Fighter1}
              </TableCell>
              <TableCell align="left">{row.Fighter2}</TableCell>
              <TableCell align="left">{row.Percentage1}</TableCell>
              <TableCell align="left">{row.Percentage2}</TableCell>
              <TableCell align="left">{row.Winner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}