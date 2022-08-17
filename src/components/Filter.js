import React, { useEffect, useState } from "react";

import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteFilteredItem,
  filterData,
  openFilterMenu,
} from "../redux/slice/FetchDataSlice";

import {
  Typography,
  ListSubheader,
  Card,
  Paper,
  ClickAwayListener,
  Popover,
} from "@mui/material";

function Filter() {
  const [genre, setGenre] = useState([]);

  const isFilterMenuOpen = useSelector((state) => state.FetchData.filterMenu);

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
  }, [setGenre]);

 

  const handleClose = () => {
    dispatch(  openFilterMenu(null));
  };

  const open = Boolean(isFilterMenuOpen);
  const id = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
      <ListSubheader
        component="div"
        sx={{
          display: "flex",
          overflowX: "visible",
          overflowY: "hidden",

          width: "450px",

          margin: "10px",
          justifyContent: "left",

          alignItems: "center",
          height: "70px",
          margin: "10px",
        }}
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
              onClick={() => {
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
      </ListSubheader>
      <Popover
        id={id}
        open={open}
        anchorEl={isFilterMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          left:-400,
          top:110
        }}
      >
        <Paper
          // hidden = {!isFilterMenuOpen}
          elevation={5}
          sx={{
            position:"relative",
          width:450,
          height:400
           
          }}
        >
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
        </Paper>
      </Popover>
    </React.Fragment>
  );
}

export default Filter;
