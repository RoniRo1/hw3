import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

export default function Profile() {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
 );
 let user = JSON.parse(sessionStorage.getItem("current"))
 let users_load = {};
 var dt = new Date(user.birthDate);

 function getMonthName(monthIndex){
  var monthsNames = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  return monthsNames[monthIndex];
}

 var israeliDate = dt.getDate() + " ב" + (getMonthName(dt.getMonth())) + " " + dt.getFullYear();

 //התנתקות
 function logoutUser(){
  sessionStorage.clear();
  // מעבר לעמוד login
 }

 console.log(israeliDate);
 console.log(users_load);


  return (
    <div style={{ direction: "rtl", margin: "0 auto" }}>
      <Card sx={{ minWidth: 350 }} style={{ textAlign: "right" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="Remy Sharp"
                src="https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h9">
               {user.firstName +" "+user.lastName}
                {/* be{bull}nev{bull}o{bull}lent*/}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user.email}
               </Typography>
              <Typography variant="body2">
              {user.street  + " " +user.house +", "+ user.city}
                <br />
                {israeliDate}
              </Typography>

              <Button>עדכון פרטים</Button>
              <Button ><a href="https://www.crazygames.com/game/diner-dash">למשחק</a></Button>
              <Button onClick={logoutUser}>התנתק</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
