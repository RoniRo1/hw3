import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditDetails from './EditDetails';
//mui
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';


export default function SystemAdmin(props) {
  

   
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
      //סוף mui 

      const [editComp, setEditComp] = useState("");
      const [users_load, setUsers_load] = useState(props.load_users)
     
      const navigate = useNavigate();

    
   //התקבל מקומפ של עריכה ואפשר להפסיק להציג אותה ולעדכן את הסטורג
     function showEditDetails(users_fromedit){
        
          setEditComp("")  
          // שולח לאבא את הרשימה 
          props.send2ParentEdit(users_fromedit)
          setUsers_load([...users_fromedit])
        
      }

      // נלחץ כפתור עריכת משתמש
      function editUser_fun (e){
         
        // מוצא את המשתמש שעליו לחצו לערוך
         let user = users_load.find((x)=> x.email==e.currentTarget.id)
         
         // מציגים את קומפ עריכה מתחת לטבלה
         setEditComp(<div>
         <EditDetails  load_user={user} send2ParentEdit={showEditDetails} parent={"admin"}/>
         </div>)
     }

     // נלחץ כפתור מחיקת משתמש
     function deleteUser (e){
      setEditComp("")  
      let userEmail = e.currentTarget.id;
      // שולחת לאבא את המייל ומקבלת ממנו בחזרה את הרשימת משתמשים המעודכנת 
      setUsers_load(props.send2ParentDelete(userEmail))

     }
    return (
      <>
      <div style={{float:'right',marginBottom:"10px"}}>
           <Button variant="outlined" startIcon={<LogoutIcon />} onClick={ () => {navigate('/')}}>
            התנתק     
            </Button>
      </div>
     
        <TableContainer component={Paper} style={{direction:"rtl"}}>
          <Table sx={{ minWidth: 1000 }} aria-label="customized table">
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
                    <IconButton id={row.email} onClick={editUser_fun}><EditIcon fontSize="small"/></IconButton>
                    <IconButton id={row.email} onClick={deleteUser} ><DeleteIcon fontSize="small"/></IconButton>
                    
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                {/*     קומפ עריכת פרטים */}
        {editComp}
       </>
        

      );
    }