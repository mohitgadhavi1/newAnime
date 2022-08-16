import React, {  useRef } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { useDispatch, useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';
import {  addToWatchlist, modifyWatchlist } from "../redux/features/FetchDataSlice";
import { deleteFilteredItem, filterData } from '../redux/features/FetchDataSlice';
import Chip from '@mui/material/Chip';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { userWatchlist } from "../redux/features/AuthSlice";


function AnimeCard() {



  const dispatch = useDispatch();
  const trackedElement = useRef();
  const searchedName = useSelector((state) => state.FetchData.searchedName);
  const filteredGenre = useSelector((state) => state.FetchData.filteredGenre);
  const data = useSelector((state) => state.FetchData.data);
  const logedinUser = useSelector((state) => state.Auth.logedinUser);
  const watchlist = useSelector(state => state.Auth.watchlist)
  console.log(watchlist)
 

  

const tempFiltedData = []


 filteredGenre.map((item)=>{
  tempFiltedData.push( ...data.filter(i=>i.genre.includes(item)))
 
})
const uniqueIds = [];
const filteredData = tempFiltedData.filter(element => {
  const isDuplicate = uniqueIds.includes(element.id);

  if (!isDuplicate) {
    uniqueIds.push(element.id);

    return true;
  }

  return false;
});


const clickHandler =(e,item)=>{
e.preventDefault();
if(watchlist.length ===0){
  dispatch(userWatchlist(item))
}
  if(watchlist.length >=1){
     watchlist.map(i=>{
 
      if (i.id === item.id){
        console.log("already exist")
       }else{
        dispatch(userWatchlist(item))
       }
    }

  )}
 
}


  return (
    <ImageList sx={{ width:"100%"}}>
    <ImageListItem key="Subheader" cols={2}>
    <ListSubheader component="div" sx={{display:"flex",background:"none",borderTop:"1px solid wheat", color:"#316B83", right:0, alignItems:"center", overflowX:"auto", height:"60px"}} >
   Filters: {filteredGenre.map((item, index)=> {
      return <Chip 
      label={item} 
      color="primary"
       variant='filled' 
       key={index} 
       sx={{marginLeft:"5px",}}
        onClick={(e)=>{
         dispatch(filterData(item.name)) }}
         onDelete={filteredGenre.includes(item)
            ? ()=>{ dispatch(deleteFilteredItem(item))}:
             undefined}
       />
   })}

    </ListSubheader>
    </ImageListItem>
    {data &&
  ((filteredData.length > 0 && filteredData) || data).map((item) => {
    if (item.title.toLowerCase().includes(searchedName)) {
      return (
      <ImageListItem draggable  key={item.id}>
        <img
          src={`${item.image}?w=248&fit=crop&auto=format`}
          srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
                    // onDragStart={(e, position) => console.log( position)}
          onDragEnter={(e, position) =>{   
            e.preventDefault();
             trackedElement.current = e.target.id
             console.log(e.target)
         
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            dispatch( addToWatchlist(item) );
           
          }}
         
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
              {logedinUser.watchlist.find(i => i.id === item.id) ? <FcLike /> : <FcLikePlaceholder/>}
            </IconButton>
          }
        />
      </ImageListItem>
    )
        }})}
  </ImageList>

  );
}

export default AnimeCard;
