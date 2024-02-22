import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Input } from '@mui/material';

export default function Register() {
  function init () {
    if (localStorage["bgroup41"] != null) {
        bgroup41 = JSON.parse(localStorage["bgroup41"]);

    }
    else {
        bgroup41 = null;
    }
}

function signin() {
    let id = document.getElementById("id").value;

    let password = document.getElementById("password").value;
    if (id != "" && password != "") {
        if (bgroup41 != undefined) {
            if (bgroup41.users[id] == undefined) {
                alert("please register")
                return;

            }
            else if (id == bgroup41.users[id]["id"] && password != bgroup41.users[id]["password"])
                alert("Wrong password :(")
            else if (id == bgroup41.users[id]["id"] && password == bgroup41.users[id]["password"]) {
                /*alert("Welcome " + bgroup41.users[id]["name"] + "!");*/
                bgroup41.currentUser = id;
                localStorage["bgroup41"] = JSON.stringify(bgroup41);
                window.location = "HtmlPage.html";
            }
            else {
                alert("User name or password is incorrect");
            }
        }
        else {
            alert("Please register first.")
        }

    }
    else {

        alert("One field or more is empty!")
    }

}




  return (
    <>
    
   


  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '75%' }}>  



            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="validationServer01"
                  label="First Name"
                  autoFocus
                 onbluer=""
                />
              </Grid>
              <Alert severity="error" visibility="hidden" name="firstname" >{errors.firstName}</Alert>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"

                />
              </Grid>
             
 
               <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => username= e.target.value}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name=" password"
                  label=" Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"  onBlur={(e) => password= e.target.value}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"  onBlur={CheckPassword}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  required
                 
                  name="file"
                  label="image"
                  type="file"
                  id="file"
                  autoComplete="image"  onBlur={CheckPassword}
                  inputProps={{ accept: 'image/*' }}
                />
              </Grid>
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={Registerbtn}
            >
              Sign Up
            </Button>
              
  
             <Alert severity="error" style={{ visibility: vis}}>{massege}</Alert>
   
          </Box>
     
  </>
  )
}
