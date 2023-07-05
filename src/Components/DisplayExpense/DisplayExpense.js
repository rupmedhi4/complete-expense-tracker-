import React from "react";
import "./DisplayExpense.css";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../Firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { deleteExpense, editExpense } from "../Redux/Slices/AddExpenseSlices";

export default function DisplayExpense() {
  const userData = useSelector((state) => state.AddExpenseSlices.userData);
  const dispatch = useDispatch();

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

    dispatch(deleteExpense(id))
  };

  const editHandler = (id)=>{
     dispatch(editExpense(id))
  }
  return (
    <div className="details-container">
      <h1 className="expenseTitle">Expense Details</h1>
      <div className="header-container">
        <span className="header-item">Money Spent</span>
        <span className="header-item">Expense Description</span>
        <span className="header-item">Category</span>
      </div>

      {userData.map((expense, index) => (
        <div key={index} className="details-item">
          <div className="item1">{expense.moneySpent}</div>
          <div className="item2">{expense.expenseDescription}</div>
          <div className="item3">
            {expense.category}
            <BiEdit className="icon-margin" onClick={()=>(editHandler(expense.id))} />
            <MdOutlineDeleteOutline onClick={() => deleteHandler(expense.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}