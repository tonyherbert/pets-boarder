import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VaccineFromFirestore } from '@/types/Vaccines';
import "./VaccinesTable.scss";

interface Vaccine {
  name: string;
  injectionDate: string; // Vous pouvez utiliser `Date` si vous préférez
  reminder: string; // Modifiez selon vos besoins
}

interface BasicTableProps {
  rows: VaccineFromFirestore[];
}

export default function TableVaccines({ rows }: BasicTableProps) {
  return (
    <TableContainer className='table-container' >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Injection date</TableCell>
            <TableCell align="right">Reminder</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.registerAt}</TableCell>
              <TableCell align="right">{row.reminder}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
