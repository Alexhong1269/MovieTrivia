import React, { useState, useEffect } from 'react';
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
  color: white;

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
    width: 170px;
    height: 170px;
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
`

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/leaderboard')
      .then(response => response.json())
      .then(data => {
        setPlayers(data.leaderboard);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <StyledLeaderboard>
      <div className="logo_container">
      <img src={triviaLogo} className="triviaLogo" alt="trivia_logo" />
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Top Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.Username}</td>
              <td>{player.Highscore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </StyledLeaderboard>
  );
};

export default Leaderboard;
