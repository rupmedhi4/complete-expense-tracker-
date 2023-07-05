import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../../Firebase";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";

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
          userexpenses:  [ ...updateDoc],
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
export const editExpense = createAsyncThunk(
  "ProductSlice/editExpense",
  async (id, { rejectWithValue, getState }) => {
    try {
      const user = auth.currentUser;
     
      const state = getState();
      const prevUserData = state.AddExpenseSlices.userData; // Replace 'ProductSlice' with the actual name of your slice

      if (user) {

        const updateDoc = prevUserData.filter((databaseExpense) => {
              return databaseExpense.id != id;
            });

        const editData = prevUserData.filter((databaseExpense) => {
              return databaseExpense.id === id;
            });

        console.log(editData[0].category);

        await setDoc(doc(db, "userdata", user.uid), {
          userexpenses:  [ ...updateDoc],
        });

        state.AddExpenseSlices.category = editData[0].category
        state.AddExpenseSlices.expenseDescription = editData[0].expenseDescription
        state.AddExpenseSlices.moneySpent = editData[0].moneySpent
               
        console.log(state.category)
        
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
    expenseDescription:'',
    category:'',
    moneySpent :''
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log(state.userData)

    },
    setExpenseDescription : (state, action) =>{
      state.expenseDescription = action.payload;
    },
    setCategory : (state, action) =>{
      state.category = action.payload;
    },
    setMoneySpent : (state, action) =>{
        state.moneySpent = action.payload;
    },
    clearInputValue : (state, action) =>{
      state.expenseDescription = '';
      state.category = '';
      state.moneySpent = '';

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

  extraReducers: (builder) => {
    builder
      .addCase(deleteExpense.pending, (state) => {
        console.log("pending")
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        alert("Successfully delete expense")
        console.log("Successfully delete expense");
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        alert("Failed to delete expense", action.payload);
        console.log("Failed to delete expense", action.payload);
      });
  },
});

export const { setUserData,setExpenseDescription, setCategory, setMoneySpent,clearInputValue} = AddExpenseSlices.actions;
export default AddExpenseSlices.reducer;