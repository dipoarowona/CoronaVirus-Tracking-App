import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

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
            <Nav.Link href="/Country">Countries</Nav.Link>
            <Nav.Link href="/Stats">Statistics</Nav.Link>
            <Nav.Link href="/Stats">EN</Nav.Link>
            <Form inline>
              <FormControl
                style={{
                  backgroundColor: "#1b2653",
                  border: "1px solid white",
                }}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default nav;
