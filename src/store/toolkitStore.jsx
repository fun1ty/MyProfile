import { configureStore } from "@reduxjs/toolkit";
import writeSlice from "./VisitWrite";

const store = configureStore({
  reducer: { visitWrite: writeSlice },
});

export default store;
