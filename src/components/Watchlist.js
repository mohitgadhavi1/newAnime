import React, { useEffect, useState } from "react";
import styles from "./Components.module.css";
import { useDispatch, useSelector } from "react-redux";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import IconButton from "@mui/material/IconButton";
import { userWatchlist } from "../redux/slice/AuthSlice";








function Watchlist() {


const dispatch = useDispatch()
const data = useSelector((state) => state.FetchData.data);
const logedinUser = useSelector((state) => state.Auth.logedinUser)

// useEffect(()=>{
//   dispatch( userWatchlist(data))
// },[data])

  
  //  console.log(dragItem);


  const clickHandler =(e,item)=>{
    e.preventDefault();
  
    dispatch(userWatchlist(item));
   
  }
   

    

  return (
    <div className={styles.Watchlist} >
      <h1>Watchlist:</h1>

   
    <ImageList sx={{ width:"100%"}}>
    <ImageListItem key="Subheader" cols={2}>
  

    </ImageListItem>
    {logedinUser.watchlist &&
  (logedinUser.watchlist).map((item) => {
    
{

      return (
      <ImageListItem draggable  key={item.id}>
        <img
          src={`${item.image}?w=248&fit=crop&auto=format`}
          srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
      
         
        />
        <ImageListItemBar
          title={item.title}
          draggable="false"
          subtitle= {`popularity: ${item.popularity}`}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${item.title}`}
              onClick={(e)=>clickHandler(e,item)}
            >
               <FcLike /> 
            </IconButton>
          }
        />
      </ImageListItem>
    )
        }
     
        })}
  </ImageList>

 
    </div>
  )
}

export default Watchlist;


