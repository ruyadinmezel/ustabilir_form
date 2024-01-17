// cityReducer.js
import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "city",
  initialState: {
    cityName: "", // Make sure these properties are defined in the initial state
    cityId: "",
  },
  reducers: {
    setCity1: (state, action) => {
      state.cityName = action.payload.name;
      state.cityId = action.payload.id;
    },
  },
});

export const { setCity1 } = citySlice.actions;
export default citySlice.reducer;
