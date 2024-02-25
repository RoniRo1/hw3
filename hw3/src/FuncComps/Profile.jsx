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
 
 let user = JSON.parse(sessionStorage.getItem("current"))

 let dt = new Date(user.birthDate);

 function getMonthName(monthIndex){
  var monthsNames = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  return monthsNames[monthIndex];
}

 let israeliDate = dt.getDate() + " ב" + (getMonthName(dt.getMonth())) + " " + dt.getFullYear();

 
 //התנתקות
 function logoutUser(){

  // להוסיף בדיקה האם מחובר, כתוב בדרישות
  sessionStorage.clear();
  // מעבר לעמוד login
 }
 
 
 function EditDetailss (){

    //לעשות משתנה שיחזיר קומפטננטה של edit?

}
 console.log(israeliDate);



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
                {israeliDate}
              </Typography>

              <Button onClick={EditDetailss}>עדכון פרטים</Button>
              <Button ><a href="https://www.crazygames.com/game/diner-dash">למשחק</a></Button>
              <Button onClick={logoutUser}>התנתק</Button>

               
            </Grid>
          </Grid>
        </CardContent>
      </Card> 
     <EditDetails load_user={user}/>
      {/*להוסיף כאן את הקומפטננטה של העריכה...*/}
    </div>
  );
}
