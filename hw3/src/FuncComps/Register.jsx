import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Input, checkboxClasses } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";



// כפתור העלאת תמונה
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Register(props) {
 
  const navigate = useNavigate();
  // מערך ערים 
  let citys = ["ראש העין", "תל אביב", "חיפה", "אשדוד", "ירושלים"];
  //הכנת מערך ליוזר
  let user = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    img: "",
    birthDate: "",
    city: "",
    street: "",
    house: "",
    username: "",
  };

  // מערך להציג פסקת שגיאה
  let error = {
    firstName: "hidden",
    lastName: "hidden",
    password: "hidden",
    email: "hidden",
    img: "hidden",
    birthDate: "hidden",
    city: "hidden",
    street: "hidden",
    house: "hidden",
    username: "hidden",
    password2: "hidden",
  };

  //states...
  const [userArr, setUserArr] = useState({ ...user });
  const [errors, setErrors] = useState({ ...error });
  const [password2, setPassword2] = useState({});
  
  
  //let users_load = [];


  // לחיצה על כתפור הרשמה
  function registerUser() {
  
    let arr = { ...errors }, counter = 0;

    //לבדוק האם קיים יוזר?
    if (!/^[a-zA-Z]+$/.test(userArr.firstName)) arr.firstName = "visible";
    else {
      arr.firstName = "hidden";
      counter++;
    }

    if (!/^[a-zA-Z]+$/.test(userArr.lastName) || userArr.lastName == "")
      arr.lastName = "visible";
    else {
      arr.lastName = "hidden";
      counter++;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[com]{3}$/.test(userArr.email) || userArr.email == "" )
      arr.email = "visible";
    else {
      arr.email = "hidden";
      counter++;
    }

    if ( !/^[a-zA-Z0-9!@#$%^&*()_></.']{1,60}$/.test(userArr.username) || userArr.username == "")
      arr.username = "visible";
    else {
      arr.username = "hidden";
      counter++;
    }

    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[<>.,{}!@#$%^&*()_?]).{7,12}$/.test( userArr.password) ||userArr.password == "")
      arr.password = "visible";
    else {
      arr.password = "hidden";
      counter++;
    }

    if (password2 != userArr.password) arr.password2 = "visible";
    else {
      arr.password2 = "hidden";
      counter++;
    }

    if (!/^[\u0590-\u05FF ]+$/.test(userArr.street) || userArr.street == "")
      arr.street = "visible";
    else {
      arr.street = "hidden";
      counter++;
    }

    // חישוב גיל
    let age = calculate_age(userArr.birthDate);
    if (120 <= age || age <= 18 || userArr.birthDate == "")
      arr.birthDate = "visible";
    else {
      arr.birthDate = "hidden";
      counter++;
    }

    if (!/^[1-9]+[0-9]*$/.test(userArr.house) || userArr.house == "")
      arr.house = "visible";
    else {
      arr.house = "hidden";
      counter++;
    }

    if (userArr.img == "") arr.img = "visible";
    else {
      arr.img = "hidden";
      counter++;
    }

    if (userArr.city == "") arr.city = "visible";
    else {
      arr.city = "hidden";
      counter++;
    }

    setErrors(arr);
    
    // אם כל הנתונים שהוכנסו תקינים
    if (counter == 11) { 
     // users_load = [...users_load, { ...userArr }];
     // localStorage.setItem("Users_load", JSON.stringify(users_load));
     props.sendUser(userArr)
     navigate('/')
    }
  }


 /*  useEffect(() => {
    //if (localStorage.getItem("Users_load") != null) {
     // users_load = JSON.parse(localStorage.getItem("Users_load"));
    }
  }); */

  return (
    <div>
      <Box sx={{ mt: 1, width: "75%" }}>
        <h1 style={{ width: "60%" }}>Sign Up</h1>

        <Grid container>
          {/*firstName*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label="First Name"
              onChange={(e) => (userArr.firstName = e.target.value)}
            />
            <Alert severity="error" style={{ visibility: errors.firstName }}>
              Invalid First name
            </Alert>
          </Grid>

          {/*lastName*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label="Last Name"
              onChange={(e) => (userArr.lastName = e.target.value)}
            />
            <Alert severity="error" style={{ visibility: errors.lastName }}>
              Invalid Last name
            </Alert>
          </Grid>

          {/*email*/}
          <Grid item xs={8} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label="Email Address"
              onChange={(e) => (userArr.email = e.target.value)}
            />
            <Alert severity="error" style={{ visibility: errors.email }}>
              example@example.com
            </Alert>
          </Grid>

          {/*username*/}
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              label="username"
              onChange={(e) => (userArr.username = e.target.value)}
            />
            <Alert severity="error" style={{ visibility: errors.username }}>
              Can contain a-z, numbers and special character up to 60
            </Alert>
          </Grid>

          {/*password*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label=" Password"
              //autoComplete="new-password"
              onBlur={(e) => (userArr.password = e.target.value)}
            />
            <Alert severity="error" style={{ visibility: errors.password }}>
              Need to contain upper letter, number and special character and
              7-12.
            </Alert>
          </Grid>

          {/*password 2*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label="Confirm Password"
              onBlur={(e) => setPassword2(e.target.value)}
            />
            <Alert severity="error" style={{ visibility: errors.password2 }}>
              Not the same Password
            </Alert>
          </Grid>

        

          {/*city*/}
          <Grid item xs={8} style={{ margin: 3 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={citys}
              renderInput={(params) => <TextField {...params} label="עיר" />}
              onChange={(event, newValue) => {
                userArr.city = newValue;
              }}
            />
            <Alert severity="error" style={{ visibility: errors.city }}>
             Please choose a city from the list
            </Alert>
          </Grid>

          {/* street*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label="Street"
              onChange={(e) => (userArr.street = e.target.value)}
            />

            <Alert severity="error" style={{ visibility: errors.street }}>
              נא להכניס רחוב בעברית בלבד
            </Alert>
          </Grid>

          {/* מספר בית*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label="house"
              onChange={(e) => (userArr.house = e.target.value)}
            />

            <Alert severity="error" style={{ visibility: errors.house }}>
              Please enter a postive number
            </Alert>
          </Grid>
          {/*img*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              fullWidth
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
         
              <VisuallyHiddenInput
                type="file"
                accept="image/jpg, image/jpeg"
                onChange={(e) => {  userArr.img=e.target.value
             /*      let imgFromInput = e.target.files[0];

                  let reader = new FileReader();
                  reader.addEventListener("load", () => {
                    // convert image file to base64 string and save to localStorage
                    userArr.img = reader.result;
                  });
                  if (imgFromInput) {
                    reader.readAsDataURL(imgFromInput);
                  } */
                }}
              />
            </Button>

            <Alert severity="error" style={{ visibility: errors.img }}>
              Upload Image jpeg or jpg.
            </Alert>
          </Grid>
          {/* תאריך לידה*/}

          <Grid item xs={4} >
            <input
              style={{ margin: 5 }}
              type="date"
              name=""
              id=""
              onBlur={(e) => (userArr.birthDate = e.target.value)}
            />
            :תאריך לידה
            <Alert severity="error" style={{ visibility: errors.birthDate }}>
             Must be 18-120 
            </Alert>
          </Grid>
          <Grid item xs={8}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={registerUser}
            >
             Register
            </Button>
          </Grid>
        </Grid>
      </Box>
      
    </div>
  );
}

// פונקציית חישוב גיל
  const calculate_age = (e) => {
    var today = new Date();
    var birthDate = new Date(e);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };