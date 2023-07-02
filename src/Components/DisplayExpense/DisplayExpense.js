import React from 'react';
import { useSelector } from 'react-redux';
import './DisplayExpense.css';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineDeleteOutline } from 'react-icons/md';

export default function DisplayExpense({ userData }) {
  const ExpenseData = useSelector((state) => state.AddExpenseSlices.Expenses);

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
            <BiEdit className="icon-margin" />
            <MdOutlineDeleteOutline />
          </div>
        </div>
      ))}
    </div>
  );
}
