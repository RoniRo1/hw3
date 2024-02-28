import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import EditDetails from "./EditDetails";
import { useNavigate } from 'react-router-dom';
export default function Profile(props) {
  const [user, setUser] = useState(props.user);
  const [editComp, setEditComp] = useState("");
  const navigate = useNavigate();
  //התנתקות
  // לעבוד על זה
  function logoutUser() {
    // להוסיף בדיקה האם מחובר, כתוב בדרישות
    sessionStorage.clear();
    navigate('/')
    // מעבר לעמוד login
  }

  // נלחץ כפתור עריכה ואפשר להציג את הקומפננטה
  function clickEdit() {
    setEditComp(
      <div>
        <EditDetails
          load_user={user}
          send2ParentEdit={showEditDetails}
          parent={"profile"}
        />
      </div>
    );
  }

  // פונקציית עריכה הסתיימה ושלחה שאפשר להחביא את הקומפוננטה
  function showEditDetails(users_loadfromedit,userfromEdit) {
    setUser(userfromEdit);
    props.send2ParentEdit(users_loadfromedit,userfromEdit)
    setEditComp("");
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
                {user.firstName + " " + user.lastName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="body2">
                {user.street + " " + user.house + ", " + user.city}
                <br />
                {user.birthDateStr}
              </Typography>

              <Button onClick={clickEdit}>עדכון פרטים</Button>
              <Button>
                <a href="https://www.crazygames.com/game/diner-dash">למשחק</a>
              </Button>
              <Button onClick={logoutUser}>התנתק</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/*       קומפונטטת עריכה
       */}

      {editComp}
    </div>
  );
}
