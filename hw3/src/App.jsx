import { Route, Routes } from 'react-router-dom'
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
   
     setUsers([...users,user]);
  }

   // מקבל משתמש שהתחבר
  function loadCurrent (user){
    setCurrent(user);
  }
// מחיקה של יוזר
  function deleteUser (userEmail){
    let usersNew = users.filter(item => item.email !=userEmail)
    setUsers([...usersNew])
    return usersNew;
  }
  function editUsers (users_load){

      setUsers([...users_load])

  }
  //עריכה של יוזר
  function editCurrentUser (users_load,user){

    setCurrent(user);
    setUsers([...users_load])

  }
 //........................................................
 
  // הטענה של הלוקל סטורג
  useEffect (()=>{
  localStorage.setItem("Users", JSON.stringify(users));
   },[users])

  // הטענה של יוזר מחובר 
  useEffect (()=>{
  sessionStorage.setItem("current",JSON.stringify(currentUser))
  },[currentUser])

  return (
    <div>
    
    <Routes>
        <Route path="/" element={<LogIn load_users={users} sendCutrrent2Parent={loadCurrent}/>} />
        <Route path="/register" element={<Register load_users={users} sendUser={loadUsers}/>} />
        <Route path="/systemAdmin" element={<SystemAdmin load_users={users} send2ParentDelete={deleteUser} send2ParentEdit={editUsers}/>} />
        <Route path="/profile" element={<Profile user={currentUser} send2ParentEdit={editCurrentUser}/>} />
      </Routes>


    </div>
  )
}

export default App
