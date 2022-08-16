import React, { useEffect, useState } from "react";


import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteFilteredItem,
  filterData,
  openFilterMenu,
} from "../redux/slice/FetchDataSlice";

import { Typography, ListSubheader } from "@mui/material";

function Filter() {
  const [genre, setGenre] = useState([]);

  const anchorEl = useSelector((state) => state.FetchData.anchorEl);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    dispatch(openFilterMenu(null));
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
  
  }, [setGenre]);

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

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "flex",
              position: "absolute",

              width: 10,
              height: 50,
              bgcolor: "background.paper",

              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
      </Menu>
    </React.Fragment>
  );
}

export default Filter;
