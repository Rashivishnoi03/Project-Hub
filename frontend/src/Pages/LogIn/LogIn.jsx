import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./login.css"
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  const logInHandler = async(e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[2].value,
    };
    setLoginData(data);
    let response = await fetch('http://localhost:5000/api/v1/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    
    response = await response.json();
    console.log(response)

    if(response.success=="false"){
      alert(response.message);
    }else{
      localStorage.setItem('token', response.token);
      navigate('/')
    }

  };
  // console.log(loginData);
  
  
  return (
    <div className="container">
      <div className="form-container">
        <div className="login-form glass">
          <h2>Login</h2>
          <form onSubmit={logInHandler}>
            <TextField
              required
              id="outlined-required"
              label="Enter E-mail"
              placeholder="Enter E-mail"
              className="user-input"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter Password"
            />

            <Link to="/forget-password" className="linkto">Forget Password</Link>

            <Link to="/signup" className="linkto">doesn't have account ? Sign Up</Link>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
