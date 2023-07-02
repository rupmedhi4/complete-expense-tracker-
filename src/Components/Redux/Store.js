import { configureStore, createReducer } from "@reduxjs/toolkit";
import AddExpenseSlices from "./Slices/AddExpenseSlices";


export default configureStore({
  reducer: {
    AddExpenseSlices
  
  },
});