import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import "../Styles/nav.css";

const nav = () => {
  return (
    <div className="covid-nav">
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
        <Navbar.Brand href="/">
          <span id="id-1">
            CORONA<span id="id-2">VIRUS</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Countries" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <Link to={{ pathname: "/country-", props: { name: "Canada" } }}>
                  Canada
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                {" "}
                <Link to={{ pathname: "/country-", props: { name: "USA" } }}>
                  USA
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                {" "}
                <Link to={{ pathname: "/country-", props: { name: "UK" } }}>
                  UK
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub/q-a-detail/coronavirus-disease-covid-19#:~:text=symptoms">
              Learn More
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default nav;
