import React from "react";
import { Link } from "react-router-dom";
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
            <Link to={{ pathname: "/country", props: { name: "Canada" } }}>
              <Nav.Link href="/Country">Countries</Nav.Link>
            </Link>

            <Nav.Link href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub/q-a-detail/coronavirus-disease-covid-19#:~:text=symptoms">
              Learn More
            </Nav.Link>
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
