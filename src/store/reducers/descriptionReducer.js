import { createSlice } from "@reduxjs/toolkit";

const descriptionSlice = createSlice({
  name: "description",
  initialState: {
    text: "",
    image: "",
  },
  reducers: {
    setDescription: (state, action) => {
      state.text = action.payload.text;
      state.image = action.payload.image;
    },
  },
});

export const { setDescription } = descriptionSlice.actions;
export default descriptionSlice.reducer;
