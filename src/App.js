import Deshboard from "./Components/Deshboard/Deshboard";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import PrivateRoutes from "./Components/PvtRoutes";
import Signup from "./Components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./Firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import UpdateDetails from './Components/UpdateProfile/UpdateUserDetails'
import UserDetails from "./Components/UserDetails/UserDetails";
import EmailVerification from "./Components/EmailVerification/EmailVerification";
import EmailPrivateRoutes from "./EmailPrivateRoutes";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import AddExpense from "./Components/AddExpense/AddExpense";

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       setUser(user)
       console.log(user)
      } else {
        setUser(null)
      }
    });
    return () => {
      unsubscribe(); 
    };
  },[])

  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/deshboard" element={<PrivateRoutes user={user} component={Deshboard} alt={Signup} />}/>
          <Route path="/updateprofile" element={<PrivateRoutes user={user} component={UpdateDetails} alt={Login} />}/>
          <Route path="/userdetails" element={<PrivateRoutes user={user} component={UserDetails} alt={Login} />}/>
          <Route path="/addexpense" element={<PrivateRoutes user={user} component={AddExpense} alt={Login} />}/>
          <Route path="/emailverification" element={<EmailPrivateRoutes  component={EmailVerification} alt={Deshboard} />}/>
        </Routes>
      </BrowserRouter>
    </>

  );

} 

export default App;
