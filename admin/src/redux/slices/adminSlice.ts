import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  isFetching: false,
  error: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.currentAdmin = null;
    },
    signinSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentAdmin = action.payload;
    },
    signinFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentAdmin = null;
    },
    logoutStart: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentAdmin = null;
    },
  },
});

export const { signinFailure, signinStart, signinSuccess, logoutStart } =
  adminSlice.actions;

export default adminSlice.reducer;
