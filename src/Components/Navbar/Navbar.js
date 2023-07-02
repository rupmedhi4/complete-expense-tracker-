import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';


export default function Navbar() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const logoutHandler = async ()=>{
    try{
       await signOut(auth)
       navigate("/")
       toast.success("Signout successfully")
    }catch(err){
      toast.error(err.message)
    }

  }
  return (
    <nav className="navbar">
      <div>
        <span>Expense Tracker</span>

        <ul>
          <li>
            <span>Home</span>
          </li>
          <li>
            <span>Products</span>
          </li>
          <li>
            <span>About Us</span>
          </li>
          <li>
            <Link to="addexpense" style={{color:"white"}}>Add Expenses</Link>
          </li>
        </ul>
      </div>
      <div>
        {
          user ? <button className="signupButton" onClick={logoutHandler}>Logout</button>
            : <>
              <Link to='/login' className="loginButton">Login</Link>
              <Link to="/signup" className="signupButton" >Signup</Link>
            </>
        }

      </div>
    </nav>
  );
}
