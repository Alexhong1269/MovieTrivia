import React, { useState } from "react";
import styled from "styled-components";
import triviaLogo from "../images/movie_trivia_logo.png";
import Nav from "react-bootstrap/Nav";
import { RiMovie2Line } from "react-icons/ri";
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
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    border: 1px dotted white;
    color: white;
    padding: 5px;
    border-radius: 7px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9;
  }

  .modal-content h1 {
    background-image: linear-gradient(45deg, #f3ec78, crimson);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  .modal-content p {
    margin: 0;
  }

  .modal-content button {
    margin: 0 auto;
    width: 200px;
  }

  .modal.hidden {
    display: block;
  }

  .instruction {
    width: 90%;
    display: flex;
    justify-contents: center;
    align-items: center;
    margin: 20px;
  }

  .ok {
    outline: none;
    border: 1px dotted white;
    padding: 10px;
    background-image: linear-gradient(45deg, #f3ec78, crimson);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  .ok:hover {
    background-image: linear-gradient(45deg, gainsboro, #f3ec78);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    cursor: pointer;
  }

  .movie-icon {
    color: red;
  }

  .instruction_p {
    width: 25%;
    height: 100%;
    margin: 20px;
    padding: 20px;
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
          <h1>HOW TO PLAY</h1>
          <p>please sign in with your account</p>
          <p>
            Not a user? <a href="/register">click here</a>
          </p>
          <div className="instruction">
            <p className="instruction_p">
              <RiMovie2Line className="movie-icon" /> Select a Category: <br />
              Choose from a variety of movie-related categories
            </p>
            <p className="instruction_p">
              <RiMovie2Line className="movie-icon" /> Choose a Question: <br />
              Each question is assigned a point vaule based on its difficulty
              level.
            </p>
            <p className="instruction_p">
              <RiMovie2Line className="movie-icon" /> Earn Points: <br /> If
              your answer is correct, you'll earn the points associated with the
              question.
            </p>
            <p className="instruction_p">
              <RiMovie2Line className="movie-icon" /> Leaderboard: <br />
              Win as many points as possible and make it on our Leaderboard!
            </p>
          </div>
          <p onClick={toggleVisibility} className="ok">
            Understood
          </p>
        </div>
      </div>
    </StyledNavbar>
  );
}

export default NavBar;
