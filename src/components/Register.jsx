import React from "react";
import styled from "styled-components";
import bgImg from "../images/home_bg.jpg";
import triviaLogo from "../images/movie_trivia_logo.png";
import { Link } from "react-router-dom";
import { useState } from 'react';

const StyledRegister = styled.main`
  box-sizing: border-box;
  background: url(${bgImg});
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo_container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: white;
  }

  .triviaLogo {
    width: 250px;
    height: 250px;
    animation: spin 10s infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  h1 {
    color: white;
    margin-bottom: 20px;
  }

  .button_container {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  .MemberText {
    text-align: center;
    margin-top: 40px;
  }
`;

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        // Redirect or show success message
      } else {
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <StyledRegister>
      <div className="logo_container">
        <img src={triviaLogo} className="triviaLogo" alt="trivia_logo" />
          <h1>Movie Trivia</h1>
          <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor = "username" id = "UserText">Enter a Username:</label>
                <br></br>
                <input type = "text" id = "username" name = "username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor = "password" id = "PasswordText">Enter a Password:</label>
                <br></br>
                <input type = "text" id = "password" name = "password"  required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="button_container">
                <button type="submit">Create Account</button>
            </div>
            <p className = "MemberText" ><Link to = "/login"> Already A Member? </Link></p>
          </form>
        </div>
      </StyledRegister>
    );
}

export default Register;
