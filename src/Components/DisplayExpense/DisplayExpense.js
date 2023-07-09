import React, { useEffect } from "react";
import "./DisplayExpense.css";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../Firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { checkDelete, checkEdit, deleteExpense, editExpense, setCategory, setExpenseDescription, setMoneySpent, trackExpenseMoney } from "../Redux/Slices/AddExpenseSlices";
import { toggleTheme } from "../Redux/Slices/toggleThemeSlices";
import { Document, Page, Text, PDFDownloadLink } from "@react-pdf/renderer";

export default function DisplayExpense() {
  const userData = useSelector((state) => state.AddExpenseSlices.userData);
  const TotalMoneyExpense = useSelector((state) => state.AddExpenseSlices.TotalMoneyExpense);
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const Theme = useSelector((state) => state.toggleThemeSlices.theme);

  const deleteHandler = (id) => {
    dispatch(checkDelete());
    dispatch(deleteExpense(id));
  };

  const editHandler = (id) => {
    const editData = userData.find((data) => data.id === id);
    dispatch(setExpenseDescription(editData.expenseDescription));
    dispatch(setCategory(editData.category));
    dispatch(setMoneySpent(editData.moneySpent));
    dispatch(checkEdit());
    dispatch(deleteExpense(id));
  };

  useEffect(() => {
    dispatch(trackExpenseMoney());
  }, [userData, dispatch]);

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
    console.log(Theme);
  };

  const MyDocument = () => (
    <Document>
      <Page>
        <Text>User Data:</Text>
        {userData.map((expense, index) => (
          <Text key={index}>
            Money Spent: {expense.moneySpent}, Expense Description: {expense.expenseDescription}, Category: {expense.category}
          </Text>
        ))}
      </Page>
    </Document>
  );

  return (
    <div className={`${Theme}`}>
      <h1 className="expenseTitle">Expense Details</h1>
      <span>Total Money: {TotalMoneyExpense}</span>
      {TotalMoneyExpense > 1000 ? <button style={{ display: "inline", marginLeft: "73rem" }}>Buy Premium</button> : null}
      <div>
        <PDFDownloadLink document={<MyDocument />} fileName="userdata.csv">
          {({ blob, url, loading, error }) =>
            loading ? "Generating PDF..." : "Download PDF"
          }
        </PDFDownloadLink>
      </div>
      <div className="header-container">
        <span className="header-item">Money Spent</span>
        <span className="header-item">Expense Description</span>
        <span className="header-item">Category</span>
      </div>

      {userData.map((expense, index) => (
        <div key={index} className="details-item">
          <div className="item1" style={{ color: "black" }}>
            {expense.moneySpent}
          </div>
          <div className="item2" style={{ color: "black" }}>
            {expense.expenseDescription}
          </div>
          <div className="item3" style={{ color: "black" }}>
            {expense.category}
            <BiEdit className="icon-margin" onClick={() => editHandler(expense.id)} />
            <MdOutlineDeleteOutline onClick={() => deleteHandler(expense.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}
