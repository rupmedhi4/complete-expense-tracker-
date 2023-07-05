import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../../Firebase";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const addExpense = createAsyncThunk(
  "ProductSlice/addExpense",
  async (userExpense, { rejectWithValue, getState }) => {
    try {
      const user = auth.currentUser;
      const state = getState();
      const prevUserData = state.AddExpenseSlices.userData; // Replace 'ProductSlice' with the actual name of your slice

      if (user) {

        await setDoc(doc(db, "userdata", user.uid), {
          userexpenses: [...prevUserData, userExpense],
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


export const deleteExpense = createAsyncThunk(
  "ProductSlice/deleteExpense",
  async (id, { rejectWithValue, getState }) => {
    try {
      const user = auth.currentUser;
      const state = getState();
      const prevUserData = state.AddExpenseSlices.userData; // Replace 'ProductSlice' with the actual name of your slice

      if (user) {

        const updateDoc = prevUserData.filter((databaseExpense) => {
          return databaseExpense.id != id;
        });

        console.log(updateDoc);

        await setDoc(doc(db, "userdata", user.uid), {
          userexpenses: [...updateDoc],
        });

        return updateDoc;
      } else {
        throw new Error("somethoing wrong");
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
    expenseDescription: '',
    category: '',
    moneySpent: '',
    isEdit : true,
    TotalMoneyExpense : 0
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log(state.userData)

    },
    setExpenseDescription: (state, action) => {
      state.expenseDescription = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMoneySpent: (state, action) => {
      state.moneySpent = action.payload;
    },
    clearInputValue: (state, action) => {
      state.expenseDescription = '';
      state.category = '';
      state.moneySpent = '';
    },
    checkEdit: (state,action)=>{
      state.isEdit = true;
    },
    checkDelete: (state,action)=>{
      state.isEdit = false;
    },
    trackExpenseMoney: (state, action) => {
      state.TotalMoneyExpense = state.userData.reduce((total, data) => total + Number(data.moneySpent),0);}
      
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
      })
      .addCase(deleteExpense.pending, (state) => {
        console.log("pending")
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isEdit ?  alert("edit your  expense") : alert("Successfully delete expense") 
        console.log("Successfully delete expense");
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        alert("Failed to delete expense", action.payload);
        console.log("Failed to delete expense", action.payload);
      });
  },
});

export const { setUserData, setExpenseDescription, setCategory, setMoneySpent, clearInputValue,checkEdit,checkDelete, trackExpenseMoney } = AddExpenseSlices.actions;
export default AddExpenseSlices.reducer;