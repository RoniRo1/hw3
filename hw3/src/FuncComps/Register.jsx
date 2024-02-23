import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { Input, checkboxClasses } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function Register() {
  // מערך שגיאות
  let errors = {
    firstName: {
      massege: "invalid First name",
      valid: /^[a-zA-Z]+$/ 
      // לא צריך regexp אולי לוותר על 
    },
    lastName: {
      massege: "invalid Last name",
      valid: /^[a-zA-Z]+$/,
    },
    password: {
      massege:
        "password need to be 7-12 and contain upper letter, 0-9, <>!@#$%^&*()_? ",
      valid: new RegExp(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[<>!@#$%^&*()_?]).{7,12}$/
      ),
    },
    password2: { massege: "not the same one" },
    email: {
      massege: "example@example.com",
      valid: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[com]{3}$/
     //   "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-z]+)*$" לא עובד
     //מסתבר שלא צריך regexp??
      ,
    },
    username: {
      massege: "a-z, numbers and specail characters only and up to 60",
      valid: new RegExp("^[a-zA-Z0-9!@#$%^&*()_></.']+$"),
    },
    street: { massege: " רק בעברית", valid: new RegExp("^[\u0590-\u05FF ]+$") },
    birthDate: { massege: "חייב להיות מעל 18 ומתחת ל120" },
    house: { massege: "מספר חיובי בלבד", valid: new RegExp("^[1-9]+[0-9]*$") },
    img: { massege: "נא להעלות תמונה" },
    city: { massege: "נא לבחור עיר מהרשימה" },
  };

 
  //הכנת מערך ליוזר 
  let user = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    img: "x.jpg",
    birthDate: "",
    city: "",
    street: "",
    house: "",
    username: "",
  };

  // מערך להציג פסקת שגיאה
  let arr = {
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
  const [values, setValues] = useState({ ...arr });
  const [password2, setPassword2] = useState({});
  let  users_load={};
 
  // מערך ערים לכפתור
  let citys = ["ראש העין", "תל אביב", "חיפה", "אשדוד", "ירושלים"];
 
 
  // לחיצה על כתפור הרשמה
  function registerUser() {
   
    let arr = { ...values },
   
    counter = 0;
   //לבדוק האם קיים יוזר?
    if (!errors.firstName.valid.test(userArr.firstName))
      arr.firstName = "visible";
    else {
      arr.firstName = "hidden";
      counter++;
    }

    if (!errors.lastName.valid.test(userArr.lastName) || userArr.lastName == "")
      arr.lastName = "visible";
    else {
      arr.lastName = "hidden";
      counter++;
    }

    if (!errors.email.valid.test(userArr.email) || userArr.email == "")
      arr.email = "visible";
    else {
      arr.email = "hidden";
      counter++;
    }

    if ( !errors.username.valid.test(userArr.username) ||  userArr.username == "" ||userArr.username.length > 60 )
      arr.username = "visible";

    else {
      arr.username = "hidden";
      counter++;
    }

    if (!errors.password.valid.test(userArr.password) || userArr.password == "")
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

    if (!errors.street.valid.test(userArr.street) || userArr.street == "")
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

    if (!errors.house.valid.test(userArr.house) || userArr.house == "")
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

    setValues(arr);
   
    if (counter == 11) {console.log(userArr)
    console.log(users_load)
    users_load={...users_load,[userArr.username]:{...userArr}}
    
    console.log(users_load)
    localStorage.setItem("Users_load",JSON.stringify(users_load) )  
      // לעבור למסך הבא....
    }
    
  }

  //const fileReader = new FileReader();

  // פונקציית חישוב גיל
  const calculate_age = (e) => {
    var today = new Date();
    var birthDate = new Date(e); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    //console.log(age_now);
    return age_now;
  };

  useEffect (()=>{
 

      if (localStorage.getItem("Users_load") != null) {
        users_load = JSON.parse(localStorage.getItem("Users_load"));
       
      }
    
    
    })
  

  return (
    <div>
      <Box sx={{ mt: 1, width: "75%" }}>

        <h1 style={{ width: "60%" }}>Sign In</h1>

        <Grid container>

          {/*firstName*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label="First Name"
              onChange={(e) => (userArr.firstName = e.target.value)}
            />
            <Alert severity="error" style={{ visibility: values.firstName }}>
             
              {errors.firstName.massege}
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
            <Alert severity="error" style={{ visibility: values.lastName }}>
            
              {errors.lastName.massege}
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
            <Alert severity="error" style={{ visibility: values.email }}>
              
              {errors.email.massege}
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
            <Alert severity="error" style={{ visibility: values.username }}>
              {errors.username.massege}
            </Alert>
          </Grid>

          {/*password*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label=" Password"
              autoComplete="new-password"
              onBlur={(e) => (userArr.password = e.target.value)}
            />
            <Alert severity="error" style={{ visibility: values.password }}>
              {errors.password.massege}
            </Alert>
          </Grid>

          {/*password 2*/}
          <Grid item xs={4} style={{ margin: 3 }}>
            <TextField
              required
              fullWidth
              label="Confirm Password"
              onBlur={(e) => (setPassword2(e.target.value))}
            />
            <Alert severity="error" style={{ visibility: values.password2 }}>
              {errors.password2.massege}
            </Alert>
          </Grid>

          {/*img*/}
          <Grid item xs={8} style={{ margin: 3 }}>
            <Input
              required
              fullWidth
              autoComplete="image"
              inputProps={{ accept: "image/*" }}
              onChange={(e) => (userArr.img = e.target.files[0])}
              type="file"
            />
  
            <Alert severity="error" style={{ visibility: values.img }}>
              {errors.img.massege}
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
            <Alert severity="error" style={{ visibility: values.city }}>
              {errors.city.massege}
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

            <Alert severity="error" style={{ visibility: values.street }}>
              {errors.street.massege}
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

            <Alert severity="error" style={{ visibility: values.house }}>
              {errors.house.massege}
            </Alert>
          </Grid>

          {/* תאריך לידה*/}

          <Grid item xs={8} sm={6}>
            <input
              style={{ margin: 5 }}
              type="date"
              name=""
              id=""
              onBlur={(e) => (userArr.birthDate = e.target.value)}
            />
            :תאריך לידה
            <Alert severity="error" style={{ visibility: values.birthDate }}>
              
              {errors.birthDate.massege}
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
   <img src={userArr.img["name"]} alt="" />
    </div>
  );
}
