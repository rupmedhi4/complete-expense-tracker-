import { configureStore, createReducer } from "@reduxjs/toolkit";
import AddExpenseSlices from "./Slices/AddExpenseSlices";
import toggleThemeSlices from "./Slices/toggleThemeSlices";


export default configureStore({
  reducer: {
    AddExpenseSlices,
    toggleThemeSlices
  
  },
});