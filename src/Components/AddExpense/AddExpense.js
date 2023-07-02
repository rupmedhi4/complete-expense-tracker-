import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenses } from '../Redux/Slices/AddExpenseSlices';
import './AddExpense.css';
import DisplayExpense from '../DisplayExpense/DisplayExpense';
import { auth, db } from '../../Firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AddExpense() {
  const [expenseDescription, setExpenseDescription] = useState('');
  const [category, setCategory] = useState('');
  const [moneySpent, setMoneySpent] = useState('');

  const user = auth.currentUser;

  const dispatch = useDispatch();
  const ExpenseData = useSelector(state => state.AddExpenseSlices.Expenses);

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      moneySpent,
      expenseDescription,
      category
    };

    try {
      await setDoc(doc(db, 'userdata', user.uid), data);
      alert("done")
    } catch (err) {
      alert(err);
      console.log(err)
    }

    // Uncomment the following lines if you want to dispatch the action and clear the form fields
    // dispatch(addExpenses({ moneySpent, expenseDescription, category }));
    // setExpenseDescription('');
    // setCategory('');
    // setMoneySpent('');
  };

  return (
    <>
      <div className="form-container">
        <h2>Expense Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="money-spent">Money Spent</label>
            <input
              type="text"
              id="money-spent"
              value={moneySpent}
              onChange={e => setMoneySpent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expense-description">Expense Description</label>
            <input
              type="text"
              id="expense-description"
              value={expenseDescription}
              onChange={e => setExpenseDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      
      {ExpenseData.length > 0 && <DisplayExpense />}
    </>
  );
}
