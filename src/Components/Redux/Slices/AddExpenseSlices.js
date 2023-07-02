import { createSlice } from "@reduxjs/toolkit";

const AddExpenseSlice = createSlice({
  name: "AddExpenseSlice",
  initialState: {
    Expenses: []
  },
  reducers: {
    addExpenses: (state, action) => {
      const { moneySpent, expenseDescription, category } = action.payload;
      
      state.Expenses = [
        ...state.Expenses,
        { moneySpent, expenseDescription, category }
      ];
      console.log(state.Expenses)
    }
    
  }
});

export const { addExpenses } = AddExpenseSlice.actions;
export default AddExpenseSlice.reducer;
