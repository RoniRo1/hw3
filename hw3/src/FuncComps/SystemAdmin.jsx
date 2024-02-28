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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export default function SystemAdmin(props) {
  

    // כנראה שכרגע לא יעבוד כי עשיתי שינויים ועוד לא יישמתי כאן
     //mui
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.dark,
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
   
     function showEditDetails(users_fromedit){
        
          setEditComp("")  
          props.send2ParentEdit(users_fromedit)
          setUsers_load(users_fromedit)
        
      }
      function editUser_fun (e){
       console.log(e.currentTarget.id)
         let user = users_load.find((x)=> x.email==e.currentTarget.id)
         console.log(user)

         setEditComp(<div>
         <EditDetails  load_user={user} send2ParentEdit={showEditDetails} parent={"admin"}/>
         </div>)
     }
     function deleteUser (e){
      let userEmail = e.currentTarget.className;
      props.send2ParentDelete(userEmail)

     }
    return (
      <>
        <TableContainer component={Paper} style={{direction:"rtl"}}>
          <Table sx={{ maxWidth: 1000 }} aria-label="customized table">
            <TableHead>
              <TableRow> 
                <StyledTableCell>תמונה</StyledTableCell>
               <StyledTableCell>שם משתמש</StyledTableCell>
              <StyledTableCell align="right">שם מלא</StyledTableCell>
                <StyledTableCell align="right">תאריך לידה</StyledTableCell>
                <StyledTableCell align="right">כתובת</StyledTableCell>
                <StyledTableCell align="right">דואר אלקטרוני</StyledTableCell>
                <StyledTableCell align="right">עריכה/מחיקה</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {users_load.map((row) => (
                <StyledTableRow key={row.email}>
                
                  <StyledTableCell component="th" scope="row">   <Avatar
                sx={{ width: 50, height: 50 }}
                alt="Remy Sharp"
                src={row.img}
              /></StyledTableCell>
                 <StyledTableCell align="right">{row.username}</StyledTableCell>
                  <StyledTableCell align="right">{row.firstName} {row.lastName}</StyledTableCell>
                  <StyledTableCell align="right">{row.birthDateStr}</StyledTableCell>
                  <StyledTableCell align="right">{row.street} {row.house}, {row.city}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton   id={row.email} onClick={editUser_fun}><EditIcon fontSize="small"/></IconButton>
                    <IconButton id={row.email} onClick={deleteUser} ><DeleteIcon fontSize="small"/></IconButton>
                    
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