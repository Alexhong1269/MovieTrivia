import React from "react";
import styled from "styled-components";
import bgImg from "../images/home_bg.jpg";
import triviaLogo from "../images/movie_trivia_logo.png";
import { Link } from "react-router-dom";

const StyledLogin = styled.main`
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
    z-index: ${(props) => (props.isHidden ? "-1" : "0")};
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

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  form input {
    width: 300px;
    padding: 5px;
    border-radius: 5px;
    background-color: black;
    border: 1px dotted gray;
    margin: 5px;
  }

  .button_container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  button {
    width: 300px;
  }

  button: hover {
    background-color: white;
    color: black;
    transition: all 0.5s ease;
    border: none;
  }

  .member {
    margin-top: 10px;
    background-image: linear-gradient(45deg, #f3ec78, crimson);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }
  .member:hover {
    background-image: linear-gradient(45deg, gainsboro, #f3ec78);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }
`;

function Login({ isHidden }) {
  return (
    <StyledLogin isHidden={isHidden}>
      <div className="logo_container">
        <img src={triviaLogo} className="triviaLogo" alt="trivia_logo" />
        <h1>Sign In</h1>
        <form>
          <div>
            <label htmlFor="username" id="UserText">
              Username:
            </label>
            <br></br>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Please enter username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" id="PasswordText">
              Password:
            </label>
            <br></br>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Please enter password"
              required
            />
          </div>
          <div className="button_container">
            <button>Sign In</button>
            <Link to="/register" className="member">
              Does not have an account?
            </Link>
          </div>
        </form>
      </div>
    </StyledLogin>
  );
}

export default Login;
