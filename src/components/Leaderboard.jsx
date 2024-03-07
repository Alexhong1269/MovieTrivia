import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import bgImg from "../images/home_bg.jpg";

const StyledLeaderboard = styled.main`
    // Add your styles here
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
    </StyledLeaderboard>
  );
};

export default Leaderboard;
