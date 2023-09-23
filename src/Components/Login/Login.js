import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/emailverification');
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err.message);
     
    }
  };

  return (
    <div className="card">
      <h1>Log in</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-signup" onClick={loginHandler}>
          Log in
        </button>
        <Link to="/forgetpassword" className="forgotBtn">
          Forgot password
        </Link>
      </form>

      <div>
        <button className="btn">
          <Link to="/signup" style={{ color: 'black' }}>
            Do not have an account? Sign up
          </Link>
        </button>
      </div>
    </div>
  );
}
