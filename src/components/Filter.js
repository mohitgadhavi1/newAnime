import React,{useEffect,useState} from 'react'
import {FaFilter} from "react-icons/fa"


import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import {useDispatch, useSelector} from "react-redux";

import { deleteFilteredItem, filterData } from '../redux/features/FetchDataSlice';

import { Accordion, AccordionSummary,AccordionDetails, IconButton, Tooltip, Typography } from '@mui/material';

function Filter() {

const [genre, setGenre] = useState([])

const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const filteredGenre = useSelector(state=> state.FetchData.filteredGenre)


  const dispatch = useDispatch();

useEffect(() => {
    const fetchGenre = async () => {
    
      await fetch("https://api.jikan.moe/v4/genres/anime")
        .then((response) => {
          return response.json();
        })
        .then((item) => {
      
          const tempData = item.data;
          setGenre(
            tempData.map((item) => {
              return {
                id: item.mal_id,
                name: item.name,
              };
            })
          );
        });
    };
    fetchGenre();
// dispatch(searchData(data))
  }, [ setGenre]);
     

  
  



  return (
    <React.Fragment>
      
    
      <Accordion sx={{margin:"10px"}} >
     
        <AccordionSummary
       
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
           <Tooltip title=" Filter ">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
      
          >
           
            <FaFilter style={{fontSize:"100%"}}/>
          </IconButton>
        </Tooltip>
        </AccordionSummary>
        <AccordionDetails>
        {genre.map((item)=>{
     return <Chip 
     label={item.name} 
     color="primary"
      variant='outlined' 
      sx={{margin:"5px"}}
      key={item.id} 
       onClick={(e)=>{
        
        dispatch(filterData(item.name)) }}
        onDelete={filteredGenre.includes(item.name)
           ? ()=>{ dispatch(deleteFilteredItem(item.name))}:
            undefined}
      />
    
    
   })} 
        </AccordionDetails>
      </Accordion>
    
     
    
      
    </React.Fragment>
  
  );
}

export default Filter



{/* <Button variant="outlined"  sx={{height:"40px", marginLeft:"10px"}} onClick={handleClickOpen}>
<FaFilter style={{fontSize:"100%"}}/>
</Button>
<Dialog

open={open}
onClose={handleClose}
>
<DialogTitle>Filter:</DialogTitle>
<DialogContent>
  <DialogContentText>
   Select genres of choice.
  </DialogContentText>
  <Box
    noValidate
    component="form"
  
    sx={{
      display: 'flex',
      height:"100px",
     
      width: 'fit-content',
    }}
  >
   {genre.map((item)=>{
     return <Chip 
     label={item.name} 
     color="primary"
      variant='outlined' 
      key={item.id} 
       onClick={(e)=>{
        
        dispatch(filterData(item.name)) }}
        onDelete={filteredGenre.includes(item.name)
           ? ()=>{ dispatch(deleteFilteredItem(item.name))}:
            undefined}
      />
    
   })}
  </Box>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose}>Close</Button>
</DialogActions>
</Dialog> */}