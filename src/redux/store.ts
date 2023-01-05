import { configureStore } from "@reduxjs/toolkit";
import { data } from "./reducers/data";

export const store = configureStore({
  reducer: {
    data: data.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
