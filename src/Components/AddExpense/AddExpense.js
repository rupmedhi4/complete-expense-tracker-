import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  addExpenses, clearInputValue, setCategory, setExpenseDescription, setMoneySpent } from '../Redux/Slices/AddExpenseSlices';
import './AddExpense.css';
import DisplayExpense from '../DisplayExpense/DisplayExpense';
import { auth, db } from '../../Firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setUserData } from '../Redux/Slices/AddExpenseSlices';
import { addExpense } from '../Redux/Slices/AddExpenseSlices';
import { toggleTheme } from '../Redux/Slices/toggleThemeSlices';

export default function AddExpense() {
   const [Loading, setLoading] = useState(true)
  // const [category, setCategory] = useState('');
  // const [moneySpent, setMoneySpent] = useState('');

  const user = auth.currentUser;

  const dispatch = useDispatch();

  const userData = useSelector(state => state.AddExpenseSlices.userData);
  const expenseDescription = useSelector(state => state.AddExpenseSlices.expenseDescription);
  const category = useSelector(state => state.AddExpenseSlices.category);
  const moneySpent = useSelector(state => state.AddExpenseSlices.moneySpent);
  const Theme = useSelector((state) => state.toggleThemeSlices.theme);
  const TotalMoneyExpense = useSelector((state) => state.AddExpenseSlices.TotalMoneyExpense);


  useEffect(()=>{
    if (user) {
      const docRef = doc(db, "userdata", user.uid);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if(docSnap.exists()) {
          //setUserData(docSnap.data().userexpenses);
          setLoading(true)
          const prevData =  docSnap.data().userexpenses;
          dispatch(setUserData(prevData))
          setLoading(false)
          console.log(user)
          console.log(prevData)
         
        } else {
          console.log("no doc");
          setLoading(true)
          dispatch(setUserData([]))
          setLoading(false)
        }
      });
      return () => unsubscribe(); // Cleanup the listener when the component unmounts

    } else {
      console.log("error");
    }
  }, [])


  const handleSubmit = async e => {
   
    e.preventDefault();
    const id = Math.random();
    const data = {
      moneySpent,
      expenseDescription,
      category,
      id
      
    };

    dispatch(addExpense(data));
    dispatch(clearInputValue())
  };

  const toggleThemeHandler = () => {
    dispatch(toggleTheme()); // Dispatch toggleTheme action
    console.log(Theme)
  };

  return (
    <>
    <div  className={`${Theme}`}>
    {TotalMoneyExpense > 1000 ? 
        <button onClick={toggleThemeHandler} className="toggle-button" style={{marginLeft:"70rem", marginTop:"30px"}}>
        Toggle Theme
      </button> : null}
    
       <div className={`form-container ${Theme}`}>
        <h2 style={{color:"black"}}>Expense Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="money-spent" style={{color:"black"}}>Money Spent</label>
            <input
              type="text"
              id="money-spent"
              value={moneySpent}
              onChange={e => dispatch(setMoneySpent(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expense-description" style={{color:"black"}}>Expense Description</label>
            <input
              type="text"
              id="expense-description"
              value={expenseDescription}
              onChange={e => dispatch(setExpenseDescription(e.target.value))}            />
          </div>
          <div className="form-group">
            <label htmlFor="category" style={{color:"black"}}>Category</label>
            <select
              id="category"
              value={category}
              onChange={e => dispatch(setCategory(e.target.value))}
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
      
      { Loading ? <p style={{display:"auto"}}>`Loading</p> : userData.length > 0 ? <DisplayExpense /> : <h2>No Expense please add your Expense</h2>}
     
    </div>
     
    </>
  );
}