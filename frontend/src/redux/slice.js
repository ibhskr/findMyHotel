import { createSlice } from "@reduxjs/toolkit";

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    setUserId: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUserId: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Business Slice
const businessSlice = createSlice({
  name: "business",
  initialState: { isAuthenticated: false, business: null },
  reducers: {
    setBusinessId: (state, action) => {
      state.business = action.payload;
      state.isAuthenticated = true;
    },
    clearBusinessId: (state) => {
      state.business = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export const { setBusinessId, clearBusinessId } = businessSlice.actions;

export const userReducer = userSlice.reducer;
export const businessReducer = businessSlice.reducer;
