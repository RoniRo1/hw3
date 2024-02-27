import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import EditDetails from "./EditDetails";

export default function Profile(props) {

 const [user,setUser]= useState(props.user)
 const [editComp, setEditComp] = useState("");
 
 //התנתקות
 // לעבוד על זה
 function logoutUser(){

  // להוסיף בדיקה האם מחובר, כתוב בדרישות
  sessionStorage.clear();
  // מעבר לעמוד login
 }

 
 // נלחץ כפתור עריכה ואפשר להציג את הקומפננטה
 function clickEdit(){
  setEditComp(<div>
    <EditDetails  load_user={user} send2ParentEdit={showEditDetails} parent={"profile"}/>
   </div>)
 }
 
 // פונקציית עריכה הסתיימה ושלחה שאפשר להחביא את הקומפוננטה 
 function showEditDetails (userfromEdit){
  setUser(userfromEdit);
  setEditComp("")

}



  return (
    <div style={{ direction: "rtl", margin: "0 auto" }}>
      <Card sx={{ minWidth: 350 }} style={{ textAlign: "right" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="Remy Sharp"
                src={user.img}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h9">
               {user.firstName +" "+user.lastName}
             
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user.email}
               </Typography>
              <Typography variant="body2">
              {user.street  + " " +user.house +", "+ user.city}
                <br />
                {user.birthDate}
              </Typography>

              <Button onClick={clickEdit}>עדכון פרטים</Button>
              <Button ><a href="https://www.crazygames.com/game/diner-dash">למשחק</a></Button>
              <Button onClick={logoutUser}>התנתק</Button>

               
            </Grid>
          </Grid>
        </CardContent>
      </Card> 

{/*       קומפונטטת עריכה
 */}     
{/* <EditDetails visEdit={visEdit} load_user={user} send2ParentEdit={showEditDetails}/>
 */}  
    {editComp}
 
   </div>
  );
}
