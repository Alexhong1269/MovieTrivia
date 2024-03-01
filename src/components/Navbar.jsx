import React, { useState } from "react";
import styled from "styled-components";
import triviaLogo from "../images/movie_trivia_logo.png";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; 


const StyledNavbar = styled.nav`
  top: 0;
  position: fixed;
  width: 100vw;
  background-color: black;

  .triviaLogo {
    width: 40px;
    height: 40px;
  }
  .nav {
    display: flex;
    align-items: center;
  }
  .link {
    background-image: linear-gradient(45deg, #f3ec78, crimson);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }
  .link:hover {
    background-image: linear-gradient(45deg, gainsboro, #f3ec78);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 999;
  }

  .modal-content {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: black;
    text-align: center;
    display: flex;
    z-index: 999;
  }
  .modal-content button {
    margin: 0 auto;
    width: 200px;
  }
  .modal.hidden {
    display: block;
  }
`;

function NavBar({ isHidden, toggleVisibility }) {
  return (
    <StyledNavbar>
      <Nav className="nav">
        <Nav.Item>
          <Nav.Link href="/">
            <img src={triviaLogo} alt="trivia_icon" className="triviaLogo" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="link" onClick={toggleVisibility}>
            How to play
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="link">Leaderboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/aboutus" className="link">
            <Link to="/gameboard">
            About Us
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className={`modal ${isHidden ? "hidden" : ""}`}>
        <div className="modal-content">
          <p>How to play</p>
          <p>1. Pick any category on the Game Board</p>
          <p>2. Pick the amount of points you want to win</p>
          <p>(The higher the value the harder the question)</p>
          <p>3. Win as many points as possible and make it on our Leaderboard</p>
          <button onClick={toggleVisibility}>Understood</button>
        </div>
      </div>
    </StyledNavbar>
  );
}

export default NavBar;
