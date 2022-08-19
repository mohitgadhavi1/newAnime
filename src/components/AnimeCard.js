import React, { useRef } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import {
  addToWatchlist,
  modifyWatchlist,
} from "../redux/slice/FetchDataSlice";
import {
  deleteFilteredItem,
  filterData,
} from "../redux/slice/FetchDataSlice";
import Chip from "@mui/material/Chip";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { userWatchlist } from "../redux/slice/AuthSlice";

function AnimeCard() {
  const dispatch = useDispatch();

  const searchedName = useSelector((state) => state.FetchData.searchedName);
  const filteredGenre = useSelector((state) => state.FetchData.filteredGenre);
  const data = useSelector((state) => state.FetchData.data);
  const logedinUser = useSelector((state) => state.Auth.logedinUser);
  const watchlist = useSelector(state => state.Auth.logedinUser.watchlist)

  const tempFiltedData = [];

  filteredGenre.map((item) => {
    tempFiltedData.push(...data.filter((i) => i.genre.includes(item)));
  });
  const uniqueIds = [];
     
  const filteredData = tempFiltedData.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });

 
  const clickHandler = (e, item) => {
    e.preventDefault();
    dispatch(userWatchlist(item));
  
  };

  

  return (
    <ImageList variant="masonry" rowHeight={250} gap={8} cols={3} sx={{ width: "100%" }}>

      {data &&
        ((filteredData.length > 0 && filteredData) || data).map((item) => {
          if (item.title.toLowerCase().includes(searchedName)) {
            return (
              <ImageListItem draggable key={item.id}>
                <img
                  src={`${item.image}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
 
                
                  onDragEnd={(e) => {
                    e.preventDefault();
                    const isThisAnimeAdded = watchlist.some((list) => list.id ===  item.id);
                    if (!isThisAnimeAdded){
                      dispatch(userWatchlist(item));
                    }
                  
                  }}
                />
                <ImageListItemBar
               
                  title={item.title}
                  draggable="false"
                  subtitle={`popularity: ${item.popularity}`}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                      onClick={(e) => clickHandler(e, item)}
                    >
                      {logedinUser.watchlist.find((i) => i.id === item.id) ? (
                        <FcLike />
                      ) : (
                        <FcLikePlaceholder />
                      )}
                    </IconButton>
                  }
                />
              </ImageListItem>
            );
          }
        })}
    </ImageList>
  );
}

export default AnimeCard;
