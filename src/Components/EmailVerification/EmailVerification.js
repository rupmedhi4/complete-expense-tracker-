import React from 'react';
import { auth } from '../../Firebase';
import { sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EmailVerification.css';

export default function EmailVerification() {
    const user = auth.currentUser;
  const emailVerificationHandler = async () => {
    try {
      await sendEmailVerification(user);
      toast.success('Email sent successfully');
      alert('Email sent');
    } catch (err) {
      toast.error(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="container1">
      <h1 className="heading1">
        <span className="btnn" onClick={emailVerificationHandler}>
          Click Here
        </span>
        {' '}
        To Verify Your Email
      </h1>
    </div>
  );
}
