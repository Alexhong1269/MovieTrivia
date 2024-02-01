import React from "react";
import styled from "styled-components";
import bgImg from "../images/home_background.jpg";
import triviaLogo from "../images/movie_trivia_logo.png";

const StyledHome = styled.main`
  box-sizing: border-box;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
    url(${bgImg});
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
    width: 300px;
    height: 300px;
    animation: spin 10s infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Home() {
  return (
    <StyledHome>
      <div className="logo_container">
        <img src={triviaLogo} className="triviaLogo" alt="trivia_logo" />
      </div>
    </StyledHome>
  );
}

export default Home;
