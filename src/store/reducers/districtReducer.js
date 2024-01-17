import { createSlice } from "@reduxjs/toolkit";

const districtSlice = createSlice({
  name: "district",
  initialState: {
    districtName: "",
    districtId: "",
  },
  reducers: {
    setDistrict1: (state, action) => {
      state.districtName = action.payload.name;
      state.districtId = action.payload.id;
    },
  },
});

export const { setDistrict1 } = districtSlice.actions;
export default districtSlice.reducer;
