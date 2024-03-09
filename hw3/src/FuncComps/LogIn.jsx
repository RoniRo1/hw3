import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
//mui
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";


export default function LogIn(props) {
 
 
  let users_load =props.load_users;
  console.log(users_load)
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

  //כניסה
  function loginUser() { 
    
//בדיקה האם אדמין
    if (userState.username=="admin" && userState.password=="ad12343211ad"){

      //מעבר לאדמין
      console.log("אדמין")
      navigate('/systemAdmin')
    }
   //בודק האם המייל קיים
  let user = users_load.find((x)=> x.username==userState.username)
  
  if (user!=undefined) {
     
    if (user.password == userState.password) {
        console.log(user);
       // שולח לאפ כדי לטעון את היוזר
        props.sendCutrrent2Parent(user)
        navigate('/profile')
      } else {
        arr.password = "visible";
      }
    } 
    //אם לא מצא מייל מציג שאין משתמש כזה
    else {
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
      <Grid item xs={10}>
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
      <Grid item xs={10}>
        <TextField
          required
          fullWidth
          label="password"
          type="password"
          onChange={(e) => (userState.password = e.target.value)}
        />
        <Alert severity="error" style={{ visibility: values.password }}>
          סיסמה לא נכונה
        </Alert>{" "}
      </Grid>
      <Grid item xs={10}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={loginUser}
        >
          Log In
        </Button>
      </Grid>
      <Grid item xs={10}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Grid>
    </>
  );
}
