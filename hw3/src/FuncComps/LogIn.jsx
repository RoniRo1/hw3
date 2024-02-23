import React from "react";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

export default function LogIn() {
  let users_load = {};

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

  users_load = JSON.parse(localStorage.getItem("Users_load"));

  function loginUser() {
    if (users_load[userState.username] != undefined) {
      if (users_load[userState.username].password == userState.password) {
        console.log("hey");
        sessionStorage.setItem(
          "current",
          JSON.stringify(users_load[userState.username])
        );
        // מעבר לעמוד משתמש
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
      <h1>Sign In</h1>
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
          Sign In
        </Button>
        {/* להוסיף כפתור מעבר להרשמה */}
      </Grid>
    </>
  );
}
