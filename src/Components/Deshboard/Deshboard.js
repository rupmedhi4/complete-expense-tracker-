import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Deshboard.css'

export default function Deshboard() {
    const navigate = useNavigate();
    const updateHandler =()=>{
      navigate("/updateprofile")
     
    }
    return (
      <div>
    
      <div className="welcome-page">
        <div className="title">
          Welcome to Expense Tracker
        </div>
        <div className="profile-incomplete">
          Your profile is Incomplete.
          <span className="complete-link" onClick={updateHandler}>Complete now</span>
        </div>
      </div>
      </div>
    )}

