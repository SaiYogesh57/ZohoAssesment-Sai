import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/ListComponent.scss";


const Navigation = () => {
 
  return (
    <div>
      <Navbar  expand='lg' >
        <Container>
          <Navbar.Brand ><Link to="/">Zoho Movies</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/">Home</Link>
              <Link to="/movies">Movies</Link>
              <Link to="/theatres">Theatres</Link>
             </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Navigation;
