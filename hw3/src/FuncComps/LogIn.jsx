import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  let users_load =[];

  //הכנת מערך ליוזר
  let arr = {
    password: "hidden",
    username: "hidden",
  };

  let user = {
    password: "",
    username: "",
  };

  const [values, setValues] = useState({ ...arr });
  const [userState, setUser] = useState({ ...user });
  const navigate = useNavigate();
  users_load = JSON.parse(localStorage.getItem("Users_load"));

  function loginUser() { 
    

    if (userState.username=="admin" && userState.password=="ad12343211ad"){

      //מעבר לאדמין
      console.log("אדמין")
      navigate('/systemAdmin')
    }
   // console.log(users_load.find((user)=> user.username==userState.username))
   
    let user = users_load.find((x)=> x.username==userState.username)
    console.log(user)
  //  if (users_load.find((x)=> x.username=useState.username)) {
  
  
  if (user!=undefined) {
      if (user.password == userState.password) {
        console.log("hey");
        sessionStorage.setItem(
          "current",
          JSON.stringify(user)
        );
        navigate('/profile')
      } else {
        arr.password = "visible";
      }
    } else {
      arr.username = "visible";
    }
    setValues({ ...arr });
  }
  console.log(users_load);
  return (
    <>
      <h1>Log In</h1>
      <br />
      {/*שם משתמש*/}
      <Grid item xs={8}>
        <TextField
          required
          fullWidth
          label="username"
          onChange={(e) => (userState.username = e.target.value)}
        />
        <Alert severity="error" style={{ visibility: values.username }}>
          שם משתמש לא קיים, נא להרשם
        </Alert>{" "}
      </Grid>
       {/*סיסמה*/}
      <Grid item xs={8}>
        <TextField
          required
          fullWidth
          label="password"
          onChange={(e) => (userState.password = e.target.value)}
        />
        <Alert severity="error" style={{ visibility: values.password }}>
          סיסמה לא נכונה
        </Alert>{" "}
      </Grid>
      <Grid item xs={8}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={loginUser}
        >
          Log In
        </Button>
        {/* להוסיף כפתור מעבר להרשמה */}
      </Grid>
      <Grid item xs={8}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
        {/* להוסיף כפתור מעבר להרשמה */}
      </Grid>
    </>
  );
}
