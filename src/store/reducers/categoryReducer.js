import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryName: "",
    categoryId: "",
  },
  reducers: {
    setCategory1: (state, action) => {
      state.categoryName = action.payload.name;
      state.categoryId = action.payload.id;
    },
  },
});

export const { setCategory1 } = categorySlice.actions;
export default categorySlice.reducer;
