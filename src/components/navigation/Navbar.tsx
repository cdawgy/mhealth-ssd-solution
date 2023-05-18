import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import backIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import "../../css/components/navigation/Navbar.css";
import Logout from "../routing/logout";

function NavigationBar() {
  const navigate = useNavigate();
  const goBackScreen = () => {
    navigate(-1);
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand onClick={goBackScreen}>
          <img src={backIcon} alt="profile icon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Profile</Nav.Link>
            <Logout />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
