import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedin, opensigninPage, userWatchlist } from '../../redux/features/AuthSlice';

import styles from "./Home.module.css";

function Header() {
  const dispatch = useDispatch()
const loginState = useSelector(state => state.Auth.login)
const data = useSelector(state => state.FetchData.data)
const  logedinUser = useSelector((state) => state.Auth.logedinUser)


// console.log( logedinUser)
const wachlist = [];
data.map((item) => {
 
  if (item.watchlist){
    wachlist.push(item)
  }
 
})

  return (
    <div className={styles.header}>
    <h1>{`Welcome ${ logedinUser ? logedinUser.firstName.toUpperCase() : "User"}` }</h1>
    <Button 
    size="medium" 
    variant="contained"  
    onClick={(data)=>{
     
      dispatch( opensigninPage())
      dispatch(isLoggedin(wachlist))
      
     
      
     }}  >
     logout
      </Button>
    </div>
  )
}

export default Header;