import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  signinPage: true,
  logedinUser: JSON.parse(localStorage.getItem("logedinUser")) || null,

};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLoggedin: (state, action) => {

      const status = action.payload;

        const updateUsers = state.users.map((user) => {
          if (user.email == state.logedinUser.email) {
            return {
              ...user,
              logedin: false,
              watchlist: state.logedinUser.watchlist,
            };
          }
          return user;
        });
        state.users =updateUsers
        localStorage.setItem("users", JSON.stringify(updateUsers));
        localStorage.removeItem("logedinUser");
        state.logedinUser = null;
      
  
      
      
    },
    addUser: (state, action) => {
      console.log(action.payload);
     
      localStorage.setItem("logedinUser", JSON.stringify(action.payload));
      state.logedinUser = action.payload
    
      const newUsers = state.users;
      newUsers.push(action.payload);
      localStorage.setItem("users", JSON.stringify(newUsers));
    },
    opensigninPage: (state, action) => {
      state.signinPage = true;
    },
    opensignupPage: (state, action) => {
      state.signinPage = false;
    },
    checkUser: (state, action) => {
      const user = action.payload;
      const logedinUser = state.users.find(
        (item) => item.email == user.email && item.password == user.password
      );
      logedinUser &&  (logedinUser.logedin = true);
   
      logedinUser &&   ( state.logedinUser = logedinUser)
        localStorage.setItem("logedinUser", JSON.stringify(logedinUser));
      //JSON.parse(localStorage.getItem("logedinUser"));
     
    },
    userWatchlist: (state, action) => {
      const tempItem = action.payload;
      const watchlist = state.logedinUser.watchlist
      if (watchlist.length === 0) {
        watchlist.push(tempItem)
      } else {
        const isThisAnimeAdded = watchlist.some((list) => list.id ===  tempItem.id);
  
        if (!isThisAnimeAdded) {
          watchlist.push(tempItem)
        }else{
          console.log("same Data")
          for( var i = 0; i < watchlist.length; i++){ 
    
            if ( watchlist[i].id === tempItem.id) { 
        
              watchlist.splice(i, 1); 
            }
          }
        }
      }  
      state.logedinUser.watchlist = watchlist
      localStorage.setItem("logedinUser", JSON.stringify(state.logedinUser));
    },
  },
});

export const {
  isLoggedin,
  addUser,
  opensigninPage,
  opensignupPage,
  checkUser,
  userWatchlist,
} = AuthSlice.actions;

export default AuthSlice.reducer;
