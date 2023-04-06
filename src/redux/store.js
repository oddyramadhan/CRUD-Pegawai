import { configureStore } from "@reduxjs/toolkit";
import pegawaiReducer from "./slices";

const reducer = {
  pegawai: pegawaiReducer,
};

const store = configureStore({
  reducer: reducer,
});

export default store;
