import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";

import { deleteFilteredItem, filterData } from "../redux/slice/FetchDataSlice";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

function Filter() {
  const [genre, setGenre] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event) => {
    setIsOpen(!isOpen);
  };

  const filteredGenre = useSelector((state) => state.FetchData.filteredGenre);

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
  }, [setGenre]);

  return (
    <React.Fragment>
      <Tooltip title=" Filter ">
        <IconButton
          onClick={handleClick}
          size="small"
          // sx={{ ml: 2 }}
        >
          <FaFilter style={{ fontSize: "100%" }} />
        </IconButton>
      </Tooltip>
      <Menu>
        <Accordion
          sx={{
            overflow: "auto",
            width: "450px",
            maxHeight: "350px",
            margin: "10px",
          }}
          expanded={!isOpen}
        >
          <AccordionSummary
            sx={{
              display: "flex",
              background: "none",
              borderTop: "1px solid wheat",
              color: "#316B83",

              alignItems: "center",

              height: "60px",
            }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Filters:</Typography>
            {filteredGenre.map((item, index) => {
              return (
                <Chip
                  label={item}
                  color="primary"
                  variant="filled"
                  key={index}
                  sx={{ marginLeft: "5px" }}
                  onClick={(e) => {
                    dispatch(filterData(item.name));
                  }}
                  onDelete={
                    filteredGenre.includes(item)
                      ? () => {
                          dispatch(deleteFilteredItem(item));
                        }
                      : undefined
                  }
                />
              );
            })}
          </AccordionSummary>
          <AccordionDetails>
            {genre.map((item) => {
              return (
                <Chip
                  label={item.name}
                  color="primary"
                  variant="outlined"
                  sx={{ margin: "5px" }}
                  key={item.id}
                  onClick={(e) => {
                    dispatch(filterData(item.name));
                  }}
                  onDelete={
                    filteredGenre.includes(item.name)
                      ? () => {
                          dispatch(deleteFilteredItem(item.name));
                        }
                      : undefined
                  }
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Menu>
    </React.Fragment>
  );
}

export default Filter;

{
  /* <Button variant="outlined"  sx={{height:"40px", marginLeft:"10px"}} onClick={handleClickOpen}>
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
</Dialog> */
}
