import { configureStore } from '@reduxjs/toolkit';

import FetchDataReducer from './features/FetchDataSlice';
import AuthSliceReducer from "./features/AuthSlice"


export const store = configureStore({
  reducer: {
   
    FetchData: FetchDataReducer,
    Auth: AuthSliceReducer
  
  },
});
