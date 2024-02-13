import React from "react";
import styled from "styled-components";
import bgImg from "../images/home_bg.jpg";

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

    h1 {
        color: White;
        margin-bottom: 5px;
    }

    form {
        margin-bottom: 200px; 
    }

    label {
        margin-bottom: 10px; 
        color: White;
    }

    input {
        margin-bottom: 20px;
        padding: 5px;
        border-radius: 5px;
        border: none;
    }

    .button_container {
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
    }   

`;

function Login() {
    return (
      <StyledLogin>
        <div className="logo_container">
          <h1>Movie Trivia</h1>
          <form>
            <div>
                <label htmlFor = "username" id = "UserText">Username:</label>
                <br></br>
                <input type = "text" id = "username" name = "username" required />
            </div>
            <div>
                <label htmlFor = "password" id = "PasswordText">Password:</label>
                <br></br>
                <input type = "text" id = "password" name = "password" required />
            </div>
            <div className="button_container">
                <button>Login</button>
            </div>
          </form>
        </div>
      </StyledLogin>
    );
}

export default Login;
