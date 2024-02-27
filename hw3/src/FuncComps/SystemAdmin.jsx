import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from "@mui/material/Avatar";
import { Button } from '@mui/material';
import { useState } from 'react';
import EditDetails from './EditDetails';



export default function SystemAdmin(props) {
  

    // כנראה שכרגע לא יעבוד כי עשיתי שינויים ועוד לא יישמתי כאן
     //mui
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
      
      //end mui 

      const [editComp, setEditComp] = useState("");
      const [users_load, setUsers_load] = useState(props.load_users)
     // let users_load = JSON.parse(localStorage.getItem("Users"));
     
     
     console.log(users_load)
   
     function showEditDetails(e){
        
          setEditComp("")  
          setUsers_load(e)
        
      }
     function editUser_fun (e){
         let user = users_load.find((x)=> x.email==e.target.id)
         console.log(user)

         setEditComp(<div>
          <EditDetails  load_user={user} send2ParentEdit={showEditDetails} parent={"admin"}/>
         </div>)
     }
    return (
      <>
        <TableContainer component={Paper} style={{direction:"rtl"}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
{/*                 להוסיף שם משתמש
 */}     
                <StyledTableCell>תמונה</StyledTableCell>
                <StyledTableCell align="right">שם מלא</StyledTableCell>
                <StyledTableCell align="right">תאריך לידה</StyledTableCell>
                <StyledTableCell align="right">כתובת</StyledTableCell>
                <StyledTableCell align="right">דואר אלקטרוני</StyledTableCell>
                <StyledTableCell align="right">עריכה/מחיקה</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users_load.map((row) => (
                <StyledTableRow key={row.firstName}>
                  <StyledTableCell component="th" scope="row">   <Avatar
                sx={{ width: 50, height: 50 }}
                alt="Remy Sharp"
                src={row.img}
              /></StyledTableCell>
                  <StyledTableCell align="right">{row.firstName} {row.lastName}</StyledTableCell>
                  <StyledTableCell align="right">{row.birthDateStr}</StyledTableCell>
                  <StyledTableCell align="right">{row.street} {row.house}, {row.city}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    <button id={row.email} onClick={editUser_fun}>עריכה</button>
                    <button  >מחיקה</button>
                    
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {editComp}
       </>
        //edituser....
      );
    }