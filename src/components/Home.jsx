import React from "react";
import styled from "styled-components";
import bgImg from "../images/home_bg.jpg";
import triviaLogo from "../images/movie_trivia_logo.png";
import { Link } from "react-router-dom";

const StyledHome = styled.main`
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

  .button_container {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .signup,
  .signin {
    padding: 10px;
    color: white;
    margin: 5px;
    background-color: black;
    width: 300px;
    text-align: center;
    border-radius: 5px;
  }

  .signup: hover {
    background-color: white;
    color: black;
    transition: all 0.5s ease;
  }
  .signin: hover {
    background-color: white;
    color: black;
    transition: all 0.5s ease;
  }

  h1 {
    color: white;
    margin-bottom: 20px;
  }
`;

function Home({ isHidden }) {
  return (
    <StyledHome isHidden={isHidden}>
      <div className="logo_container">
        <img src={triviaLogo} className="triviaLogo" alt="trivia_logo" />
        <h1>Movie Trivia</h1>
        <div className="button_container">

          <Link to="/register" className="signup">
            Sign Up
          </Link>
          <Link to="/signin" className="signin">
            Already a user?
          </Link>
        </div>
      </div>
    </StyledHome>
  );
}

export default Home;
