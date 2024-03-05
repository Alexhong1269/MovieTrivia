import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "./AuthProvider";
import axios from "../api/axios";
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
    color: white;
    outline: none;
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
    color: white;
    background-color: black;
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

  .error_message {
    color: red;
    margin: 0;
  }

  .login-success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    weight: 100vw;
  }
`;

const LOGIN_URL = "/auth";

function Login({ isHidden }) {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthroized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <StyledLogin isHidden={isHidden}>
          <div className="login-success">
            <h1>Welcome!</h1>
            <Link to="/game" className="member">
              Start Game
            </Link>
          </div>
        </StyledLogin>
      ) : (
        <StyledLogin isHidden={isHidden}>
          <div className="logo_container">
            <img src={triviaLogo} className="triviaLogo" alt="trivia_logo" />
            <h1>Sign In</h1>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form action="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" id="UserText">
                  Username:
                </label>
                <br></br>
                <input
                  type="text"
                  id="username"
                  name="username"
                  ref={userRef}
                  autoComplete="off"
                  placeholder="Please enter username"
                  required
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
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
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                />
              </div>
              <div className="button_container">
                <button type="submit">Sign In</button>
                <Link to="/register" className="member">
                  Does not have an account?
                </Link>
              </div>
            </form>
          </div>
        </StyledLogin>
      )}
    </>
  );
}

export default Login;
