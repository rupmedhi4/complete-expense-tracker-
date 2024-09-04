import React, { useState } from 'react';
import './ForgetPassword.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset email sent successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={resetPasswordHandler}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <ToastContainer /> 
    </div>
  );
}
