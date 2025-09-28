import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/DataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
