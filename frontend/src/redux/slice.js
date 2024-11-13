import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { userId: null, hotelId: null },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
    setHotelId: (state, action) => {
      state.hotelId = action.payload;
    },
    clearHotelId: (state) => {
      state.hotelId = null;
    }
  }
});

export const { setUserId, clearUserId, setHotelId, clearHotelId } = userSlice.actions;
export default userSlice.reducer;
