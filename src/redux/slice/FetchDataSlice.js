import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  // loading: false,
  searchedName: "",
  filteredGenre: [],
  anchorEl : null
};

const FetchdataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchedData: (state, action) => {
      state.data = [...action.payload];
    },

    searchData: (state, action) => {
      const searchQuery = action.payload;
      state.searchedName = searchQuery.toLowerCase();
    },
    filterData: (state, action) => {
      const filterQuery = action.payload;

      if (state.filteredGenre.length > 0) {
        if (state.filteredGenre.some((item) => item == filterQuery)) {
          console.log("Data is Same");
        } else {
          state.filteredGenre.push(filterQuery);
        }
      } else {
        state.filteredGenre.push(filterQuery);
      }
    },
    deleteFilteredItem: (state, action) => {
      const index = state.filteredGenre.indexOf(action.payload);
      if (index > -1) {
        // only splice array when item is found
        state.filteredGenre.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    openFilterMenu:(state,action)=>{
     state.anchorEl = action.payload
    }

  
  },
});

export const {
  openFilterMenu,
  modifyWatchlist,
  fetchedData,
  searchData,
  filterData,
  deleteFilteredItem,
  addToWatchlist,
} = FetchdataSlice.actions;

export default FetchdataSlice.reducer;
