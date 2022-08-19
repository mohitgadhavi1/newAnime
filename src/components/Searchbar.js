import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";

import { openFilterMenu, searchData } from "../redux/slice/FetchDataSlice";
import { Divider, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";

export default function Searchbar() {
  const dispatch = useDispatch();
  const isFilterMenuOpen = useSelector((state) => state.FetchData.filterMenu);
 
  const handleClick = (event) => {
    dispatch(  openFilterMenu(event.currentTarget));
  };

  return (
    <Paper
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 ,backgroundColor:'#F1F1F1'}}
    >
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        id="outlined-name"
        placeholder="     What's on your Mind?"
        size="small"
        sx={{ ml: 1, flex: 1 }}
        onChange={(e) => dispatch(searchData(e.target.value))}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title=" Filter ">
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={handleClick}
          size="small"
          // sx={{ ml: 2 }}
        >
          <FaFilter style={{ fontSize: "100%" }} />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
