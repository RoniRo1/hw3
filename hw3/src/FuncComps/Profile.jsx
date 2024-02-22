import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

export default function Profile() {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
 );

   //הכנת מערך ליוזר 
   const user = {
    firstName: "בלה",
    lastName: "בלה",
    password: "",
    email: "",
    img: "",
    birthDate: "",
    city: "",
    street: "",
    house: "",
    username: "",
  };

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
                email
              </Typography>
              <Typography variant="body2">
                כתובת
                <br />
                יום הולדת
              </Typography>

              <Button>עדכון פרטים</Button>
              <Button>למשחק</Button>
              <Button>התנתק</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
