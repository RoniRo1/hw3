
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
 
  const [users, setUsers] = useState(()=>{
    return JSON.parse(localStorage.getItem("Users"))||[]

  })
  const navigate = useNavigate();
 
  function loadUsers (user){
    console.log(user)
    // יגיע דאטה מהרג'יסטר וכאן נטען את זה או מהעריכה
     setUsers([...users,user]);
  }

  useEffect (()=>{

    //  if (localStorage.getItem("Users") != null) 
      //setUsers(JSON.parse(localStorage.getItem("Users")));
      
      return () => {
    
      console.log("bye")
      }
    }
  ,[])
  
  // הטענה של הלוקל סטורג
  useEffect (()=>{
  console.log(users)
  localStorage.setItem("Users", JSON.stringify(users));
  //navigate('/')
   },[users])


   // לעשות פונקצי שמקבלת יוזר ושולחת אותו לedit 

  return (
    <div>
    
 
   
    <Routes>
        <Route path="/" element={<LogIn load_users={users}/>} />
        <Route path="/register" element={<Register sendUser={loadUsers}/>} />
        <Route path="/systemAdmin" element={<SystemAdmin load_users={users}/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>


    </div>
  )
}

export default App
