import { useState } from 'react'

import './App.css'
import Register from './FuncComps/Register'
import LogIn from './FuncComps/LogIn'
import Profile from './FuncComps/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    

    <LogIn/>
     
    </>
  )
}

export default App
