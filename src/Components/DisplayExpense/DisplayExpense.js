import React, { useEffect } from "react";
import "./DisplayExpense.css";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../Firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { checkDelete, checkEdit, deleteExpense, editExpense, setCategory, setExpenseDescription, setMoneySpent, trackExpenseMoney } from "../Redux/Slices/AddExpenseSlices";
import { toggleTheme } from "../Redux/Slices/toggleThemeSlices";

export default function DisplayExpense() {
  const userData = useSelector((state) => state.AddExpenseSlices.userData);
  const TotalMoneyExpense = useSelector((state) => state.AddExpenseSlices.TotalMoneyExpense);
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const Theme = useSelector((state) => state.toggleThemeSlices.theme);


  const deleteHandler = (id) => {
    console.log(id);
    // const user = auth.currentUser;
    // const docRef = doc(db, "userdata", user.uid);
    // onSnapshot(docRef, (docSnap) => {
    //   const prevData = docSnap.data().userexpenses;
    //   const updateDoc = prevData.filter((databaseExpense) => {
    //     return databaseExpense.id != id;
    //   });
    //   console.log(updateDoc);

    //   setDoc(doc(db, "userdata", user.uid), {
    //     userexpenses: [...updateDoc],
    //   });
    // });
    dispatch(checkDelete())
    dispatch(deleteExpense(id))
  };

  const editHandler = (id) => {
    // dispatch(editExpense(id))
    const editData = userData.filter((data) => {
      if (data.id === id) {
        return data;
      }
    })
    console.log(editData[0].category)
    dispatch(setExpenseDescription(editData[0].expenseDescription))
    dispatch(setCategory(editData[0].category))
    dispatch(setMoneySpent(editData[0].moneySpent))

    dispatch(checkEdit())
    dispatch(deleteExpense(id))
  }

  useEffect(() => {
    dispatch(trackExpenseMoney());
  }, [userData, dispatch]);

  const toggleThemeHandler = () => {
    dispatch(toggleTheme()); // Dispatch toggleTheme action
    console.log(Theme)
  };


  return (
    <div className={`${Theme}`}>
      <h1 className="expenseTitle">Expense Details</h1>
      <span>Total Money: {TotalMoneyExpense}</span>
      {TotalMoneyExpense > 1000 ? <button style={{ display: "inline", marginLeft: "73rem" }}>Buy Premium</button> : null}

      <div className="header-container">
        <span className="header-item">Money Spent</span>
        <span className="header-item">Expense Description</span>
        <span className="header-item">Category</span>
      </div>

      {userData.map((expense, index) => (
        <div key={index} className="details-item" >
          <div className="item1" style={{color:"black"}}>{expense.moneySpent}</div>
          <div className="item2" style={{color:"black"}}>{expense.expenseDescription}</div>
          <div className="item3" style={{color:"black"}}>
            {expense.category}
            <BiEdit className="icon-margin" onClick={() => (editHandler(expense.id))} />
            <MdOutlineDeleteOutline onClick={() => deleteHandler(expense.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}