
import { useEffect, useState } from "react";
import './App.css'
import Register from './FuncComps/Register'
import LogIn from './FuncComps/LogIn'
import Profile from './FuncComps/Profile'
import EditDetails from './FuncComps/EditDetails'
import SystemAdmin from './FuncComps/SystemAdmin'
import { Link, Route, Routes } from 'react-router-dom'
function App() {
 
 
  return (
    <div>
    
 
   
    <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/systemAdmin" element={<SystemAdmin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>


    </div>
  )
}

export default App
