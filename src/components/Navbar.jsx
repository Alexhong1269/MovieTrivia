import styled from "styled-components";
import triviaLogo from "../images/movie_trivia_logo.png";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

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
`;

function NavBar() {
  return (
    <StyledNavbar>
      <Nav className="nav">
        <Nav.Item>
          <Nav.Link href="/">
            <img src={triviaLogo} alt="wook-icon" className="triviaLogo" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about" className="link">
            about
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/projects" className="link">
            projects
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/contact" className="link">
            contact
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </StyledNavbar>
  );
}

export default NavBar;
