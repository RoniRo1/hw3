import { useState } from 'react'

import './App.css'
import Register from './FuncComps/Register'
import LogIn from './FuncComps/LogIn'
import Profile from './FuncComps/Profile'
import EditDetails from './FuncComps/EditDetails'
import SystemAdmin from './FuncComps/SystemAdmin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <EditDetails/>
    <br />
    <br />
    <br />

    </>
  )
}

export default App
