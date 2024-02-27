import { Link, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import './App.css'
import Register from './FuncComps/Register'
import LogIn from './FuncComps/LogIn'
import Profile from './FuncComps/Profile'
import SystemAdmin from './FuncComps/SystemAdmin'

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

  function deleteUser (userEmail){
    let index = users.findIndex((x)=> x.email==userEmail)
    let temp = users
    temp.splice(index,1);
    setUsers([...users])
    
    console.log(temp)
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
        <Route path="/systemAdmin" element={<SystemAdmin load_users={users} send2ParentDelete={deleteUser}/>} />
        <Route path="/profile" element={<Profile user={currentUser}/>} />
      </Routes>


    </div>
  )
}

export default App
