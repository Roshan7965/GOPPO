import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import getCurrentUser from './customHooks/getCurrentUser.jsx'
import { useSelector } from 'react-redux'
import Home from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'

const App = () => {
  getCurrentUser();
  let {userData}=useSelector(state=>state.user);
  return (
    <div> 
      
      <Routes>
        <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>} />
        <Route path='/signup' element={!userData ?<Signup/>:<Navigate to="/profile"/>}/>
        <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}/>

      </Routes>
    </div>
  )
}

export default App