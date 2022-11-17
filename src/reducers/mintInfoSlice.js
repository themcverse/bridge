import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  citizens: 0,
  mintedNum: 0,
  stockNum: 0,
  avaxPrice: 0,
};

export const mintInfoSlice = createSlice({
  name: "mintInfo",
  initialState,
  reducers: {
    increment: (state) => {
      state.citizens += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.citizens += action.payload;
    },
    setCitizen: (state, action) => {
      state.citizens = action.payload;
    },
    setMintedNum: (state, action) => {
      state.mintedNum = action.payload;
    },
    setStockNum: (state, action) => {
      state.stockNum = action.payload;
    },
    setAvaxPrice: (state, action) => {
      state.avaxPrice = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setCitizen,
  setMintedNum,
  setStockNum,
  setAvaxPrice,
} = mintInfoSlice.actions;

export default mintInfoSlice.reducer;
