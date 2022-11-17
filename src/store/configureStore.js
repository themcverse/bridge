import { configureStore } from "@reduxjs/toolkit";

import mintInfoReducer from "../reducers/mintInfoSlice";

export const store = configureStore({
  reducer: {
    mintInfo: mintInfoReducer,
  },
});
