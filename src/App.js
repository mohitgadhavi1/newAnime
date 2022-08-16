import React from 'react';
import './App.css';
import Data from './Data';
import Home from './pages/home/Home';
import Signin from './pages/auth/Signin'
import { useSelector } from 'react-redux';
import Signup from './pages/auth/Signup';


function App() {
  const   logedinUser = useSelector((state) => state.Auth.logedinUser);
  const users = useSelector(state => state.Auth.users)
  const  signinPage = useSelector(state => state.Auth. signinPage)

 
    // console.log( logedinUser)
    // console.log(users )


  return (
   
    <div className="App">
       <Data/>
       {logedinUser  ?  <Home /> : signinPage ? <Signin/> : <Signup/> }
       
      
    </div>

  );
}

export default App;
