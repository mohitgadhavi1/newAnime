import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  signinPage: true,
  logedinUser: JSON.parse(localStorage.getItem("logedinUser")) || null,
  watchlist: [],
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLoggedin: (state, action) => {
      console.log(action.payload);
      const status = action.payload;
      if (status == "login") {
        state.logedinUser = JSON.parse(localStorage.getItem("logedinUser"));
      } else {
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
        localStorage.setItem("users", JSON.stringify(updateUsers));
        localStorage.removeItem("logedinUser");
        state.logedinUser = null;
      }
    },
    addUser: (state, action) => {
      console.log(action.payload);
      console.log(state.users);
      localStorage.setItem("logedinUser", JSON.stringify(action.payload));
      //   state.logedinUser = action.payload
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
      //    logedinUser ? state.login = true : state.login = false
      logedinUser && (logedinUser.logedin = true);
      logedinUser &&
        localStorage.setItem("logedinUser", JSON.stringify(logedinUser));
      state.logedinUser = JSON.parse(localStorage.getItem("logedinUser"));
    },
    userWatchlist: (state, action) => {
      const newWatchlist = state.watchlist;
      const tempItem = action.payload;
   
      newWatchlist.push(tempItem)
      
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
