import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import bgImg from "../images/home_bg.jpg";
import triviaLogo from "../images/movie_trivia_logo.png";

const StyledLeaderboard = styled.main`
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
    width: 150px;
    height: 150px;
    animation: spin 5s infinite linear;
    z-index: ${(props) => (props.isHidden ? "-1" : "0")};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  h1 {
    color: white;
    margin-bottom: 20px;
  }

  .username {
    color: lightgreen;
    font-weight: bold;
  }

  .highscore {
    color: lightblue;
    font-style: italic;
  }

  .leaders {
    color: white;
    font-size: 1.4rem;
    background-color: rgba(0, 0, 0, 0.75);
    width: 500px;
    text-align: center;
    padding: 5px;
    margin: 7px auto;
    border-radius: 10px;
    list-style-type: none;
    border: 1px dotted white;
  }

  ul {
    padding: 0;
    list-style-type: none;
    width: fit-content;
  }
`;

const Leaderboard = ({ isHidden }) => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        // Update the URL to match your server's address and endpoint
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/leaderboard`
        );
        console.log(response.data);
        setLeaders(response.data);
      } catch (err) {
        console.error("Database query failed: ", err);
        res.status(500).send("Error fetching leaderboard: " + err.message);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <>
      <StyledLeaderboard isHidden={isHidden}>
        <img src={triviaLogo} className="triviaLogo" alt="trivia_logo" />
        <h1>Leaderboard</h1>
        <ul>
          {leaders.map((leader, index) => (
            <li className="leaders" key={index}>
              <span className="username">{leader.Username}</span> -{" "}
              <span className="highscore">{leader.Highscore}</span>
            </li>
          ))}
        </ul>
      </StyledLeaderboard>
    </>
  );
};

export default Leaderboard;
