import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {Notify} from "notiflix"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/user/signin", {
        email,
        password,
      });
     Notify.success("Login successful")
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      const userRole = decoded.role;
      const userName=decoded.Name;
      const userEmail=decoded.email;
      localStorage.setItem("user", JSON.stringify(response.data.user));
       // save name in localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);
    navigate("/")

      // Navigate based on the user role
      // if (userRole === "admin") {
      //   navigate('/admin-dashboard');
      // } else if (userRole === "carOwner") {
      //   navigate('/client-dashboard');
      // } else {
      //     navigate('/parkingOwner-dashboard'); // Redirect to the dashboard for non-admin users
      // }

    } catch (error) {
      Notify.failure(error.response?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post("http://localhost:5000/user/signup", {
            Name,
            email,
            password
        });
        Notify.success(response.data.message);
        setTimeout(()=>
        {
            navigate("/")
        },1000)
    } catch (error) {
        setMessage(error.response?.data?.message || "SignUp Failed")
    }
    finally{
        setLoading(false);
    }
};
  return (
    <div className="login-container">
      {!showSignup ? (
        <>
          <h2>Login to Your Account</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-warning">Login</button>
          </form>
          <p>
            Don't have an account? <span className="signup-link" onClick={() => setShowSignup(true)}>Sign up</span>
          </p>
        </>
      ) : (
        <>
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name:</label>
              <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary">Sign Up</button>
          </form>
          {loading && <p>Loading...</p>}
          <p>
            Already have an account? <span className="signup-link" onClick={() => setShowSignup(false)}>Login</span>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginPage;
