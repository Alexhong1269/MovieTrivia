import React from "react";
import styled from "styled-components";
import bgImg from "../images/home_bg.jpg";
import triviaLogo from "../images/movie_trivia_logo.png";
import { Link } from "react-router-dom";

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
  return (
    <StyledRegister>
      <div className="logo_container">
        <img src={triviaLogo} className="triviaLogo" alt="trivia_logo" />
          <h1>Movie Trivia</h1>
          <form>
            <div>
                <label htmlFor = "username" id = "UserText">Enter a Username:</label>
                <br></br>
                <input type = "text" id = "username" name = "username" required />
            </div>
            <div>
                <label htmlFor = "password" id = "PasswordText">Enter a Password:</label>
                <br></br>
                <input type = "text" id = "password" name = "password"  required/>
            </div>
            <div className="button_container">
                <button>Create Account</button>
            </div>
            <p className = "MemberText" ><Link to = "/login"> Already A Member? </Link></p>
          </form>
        </div>
      </StyledRegister>
    );
}

export default Register;
