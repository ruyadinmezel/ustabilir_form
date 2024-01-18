// store.js
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./reducers/cityReducer"; // Create this reducer
import districtReducer from "./reducers/districtReducer"; // Create this reducer
import categoryReducer from "./reducers/categoryReducer";
import descriptionReducer from "./reducers/descriptionReducer";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    city: cityReducer,
    district: districtReducer,
    category: categoryReducer,
    description: descriptionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Apply redux-thunk middleware
});

export default store;
