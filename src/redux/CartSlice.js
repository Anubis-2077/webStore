// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isVisible: false,
  },
  reducers: {
    toggleCartVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleCartVisibility } = cartSlice.actions;

export default cartSlice.reducer;
