import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function SystemAdmin() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(
        name= "String",
        calories= "number",
        fat="number",
        carbs= "number",
        protein= 'number',
      ) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
      
      let users_load = JSON.parse(localStorage.getItem("Users_load"));
      console.log(users_load)
   
    return (
        <TableContainer component={Paper} style={{direction:"rtl"}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>תמוונה</StyledTableCell>
                <StyledTableCell align="right">שם מלא</StyledTableCell>
                <StyledTableCell align="right">תאריך לידה</StyledTableCell>
                <StyledTableCell align="right">כתובת</StyledTableCell>
                <StyledTableCell align="right">דואר אלקטרוני</StyledTableCell>
                <StyledTableCell align="right">עריכה/מחיקה</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users_load.map((row) => (
                <StyledTableRow key={users_load.firstName}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.firstName} {row.lastName}</StyledTableCell>
                  <StyledTableCell align="right">{row.birthDate}</StyledTableCell>
                  <StyledTableCell align="right">{row.street} {row.house}, {row.city}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    <input type="button" />
                    <input type="button" />
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }