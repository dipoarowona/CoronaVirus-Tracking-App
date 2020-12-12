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
              <Link
                id="dd-item"
                to={{
                  pathname: "/country/Canada",
                  props: { name: "Canada" },
                }}
              >
                <NavDropdown.Item href="#action/3.1">Canada</NavDropdown.Item>
              </Link>

              <Link
                id="dd-item"
                to={{ pathname: "/country/USA", props: { name: "USA" } }}
              >
                <NavDropdown.Item href="#action/3.2">USA</NavDropdown.Item>
              </Link>

              <Link
                id="dd-item"
                to={{ pathname: "/country/UK", props: { name: "UK" } }}
              >
                <NavDropdown.Item href="#action/3.3">UK</NavDropdown.Item>
              </Link>
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
