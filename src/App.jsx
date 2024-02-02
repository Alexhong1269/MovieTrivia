import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css";

const StyledApp = styled.div``;

function App() {
  return (
    <StyledApp className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
