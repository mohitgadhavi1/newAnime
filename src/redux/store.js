import { configureStore } from '@reduxjs/toolkit';

import FetchDataReducer from './slice/FetchDataSlice';
import AuthSliceReducer from "./slice/AuthSlice"


export const store = configureStore({
  reducer: {
   
    FetchData: FetchDataReducer,
    Auth: AuthSliceReducer
  
  },
});
