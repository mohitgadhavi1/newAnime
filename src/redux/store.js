import { configureStore } from "@reduxjs/toolkit";

import FetchDataReducer from "./slice/FetchDataSlice";
import AuthSliceReducer from "./slice/AuthSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
  reducer: {
    FetchData: FetchDataReducer,
    Auth: AuthSliceReducer,
  },
});
