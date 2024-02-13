import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

const StyledApp = styled.div``;

function App() {
  const [isHidden, setIsHidden] = useState(false);
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <StyledApp className="App">
      <BrowserRouter>
        <Navbar isHidden={isHidden} toggleVisibility={toggleVisibility} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path = "/register" element={<Register />}/>
          <Route path = "/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
