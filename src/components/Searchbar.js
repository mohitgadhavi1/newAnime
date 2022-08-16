import  React,{useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../redux/slice/FetchDataSlice";
import {searchData} from "../redux/slice/FetchDataSlice"



export default function Searchbar() {

    
    const dispatch = useDispatch()



  return (
    <TextField  
       id="outlined-name"
       label="What's on your Mind?"
       size="small"
       sx={{width:"80%",color:"#316B83", marginLeft:"2%"}}
       onChange={(e)=>dispatch(searchData(e.target.value))}
  
  />
  );
}