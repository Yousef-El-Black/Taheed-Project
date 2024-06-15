import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  error: false,
  isFetching: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signinStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.currentUser = null;
    },
    signinSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signinFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentUser = null;
    },
    logoutStart: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
    },
  },
});

export const { signinFailure, signinStart, signinSuccess, logoutStart } =
  userSlice.actions;

export default userSlice.reducer;
