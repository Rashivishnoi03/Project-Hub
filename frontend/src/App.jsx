import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/SignUp'
import LogIn from './Pages/LogIn/LogIn'
import CreateProject from './Pages/CreateProject/CreateProject'
import DashBoard from "./Pages/DashBoard/DashBoard";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Profile from './Component/Profile'

function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      console.log('hello world')
      navigate('/login');
    }else{
      console.log('bye')
    }
  },[])


  return (
    <>
     <Routes>
      
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<LogIn/>}></Route>
      <Route path='/add-project' element={<CreateProject/>}></Route>
      <Route path='/dashboard' element={<DashBoard/>}></Route>
      <Route path='/contact' element= {<Contact/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path ='/profile' element={<Profile/>}></Route>
     </Routes>
   
    </>
  )
}

export default App
