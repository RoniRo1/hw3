
import { useEffect, useState } from "react";
import './App.css'
import Register from './FuncComps/Register'
import LogIn from './FuncComps/LogIn'
import Profile from './FuncComps/Profile'
import EditDetails from './FuncComps/EditDetails'
import SystemAdmin from './FuncComps/SystemAdmin'
import { Link, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
 
  // כל הלוקל סטורג
  const [users, setUsers] = useState(()=>{
    return JSON.parse(localStorage.getItem("Users"))||[]
  })
  // סשיין סטורג
  const [currentUser, setCurrent] = useState(()=> {
    return JSON.parse(sessionStorage.getItem("current"))||{}
  })
  
  //..................................................
  // הטענת יוזרים מההרשמה 
  function loadUsers (user){
    console.log(user)
     setUsers([...users,user]);
  }

   // מקבל משתמש שהתחבר
  function loadCurrent (user){
    setCurrent(user);
  }


 //.........................................................
  // כרגע אין טעם 
 /*  useEffect (()=>{

    //  if (localStorage.getItem("Users") != null) 
    //setUsers(JSON.parse(localStorage.getItem("Users")));
      
      return () => {
    
      console.log("bye")
      }
    }
  ,[])
  
 */
 
  // הטענה של הלוקל סטורג
  useEffect (()=>{
  console.log(users)
  localStorage.setItem("Users", JSON.stringify(users));
  //navigate('/')
   },[users])

  // הטענה של יוזר מחובר 
  useEffect (()=>{
  sessionStorage.setItem("current",JSON.stringify(currentUser))
  },[currentUser])

  return (
    <div>
    
 
   
    <Routes>
        <Route path="/" element={<LogIn load_users={users} sendCutrrent2Parent={loadCurrent}/>} />
        <Route path="/register" element={<Register sendUser={loadUsers}/>} />
        <Route path="/systemAdmin" element={<SystemAdmin load_users={users}/>} />
        <Route path="/profile" element={<Profile user={currentUser}/>} />
      </Routes>


    </div>
  )
}

export default App
