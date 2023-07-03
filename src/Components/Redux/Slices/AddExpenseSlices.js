import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../../Firebase";
import { setDoc, doc } from "firebase/firestore";

export const addExpense = createAsyncThunk(
  "ProductSlice/addExpense",
  async (userExpense, { rejectWithValue, getState }) => {
    try {
      const user = auth.currentUser;
      const state = getState();
      const prevUserData = state.AddExpenseSlices.userData; // Replace 'ProductSlice' with the actual name of your slice

      if (user) {
      
        await setDoc(doc(db, "userdata", user.uid), {
          userexpenses:  [ ...prevUserData,userExpense],
        });
        return userExpense;
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const AddExpenseSlices = createSlice({
  name: "ProductSlice",
  initialState: {
    userData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log(state.userData)

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Successfully added expense");
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Failed to add expense", action.payload);
      });
  },
});

export const { setUserData } = AddExpenseSlices.actions;
export default AddExpenseSlices.reducer;
