import React from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CountUp from "react-countup";

import VirusImg from "../img/virusIMG.png";
import CA from "../img/Flags/canada.svg";
import CH from "../img/Flags/china.svg";
import USA from "../img/Flags/united-states.svg";
import UK from "../img/Flags/united-kingdom.svg";

import "../Styles/home.css";

const Home = () => {
  const [cases, setCases] = useState(60000000);
  const [deaths, setDeaths] = useState(14000000);
  const [recovered, setRecovered] = useState(41000000);

  useEffect(() => {
    fetch("/global-data")
      .then((res) => res.json())
      .then((data) => {
        setCases(data[0].confirmed);
        setDeaths(data[0].deaths);
        setRecovered(data[0].recovered);
      });
  }, []);

  return (
    <div className="HomePage">
      <Row>
        <Col md="auto">
          <img id="virus" src={VirusImg} alt="virus" />
        </Col>
        <Col>
          <div className="Data">
            <h1>TOTAL CONFIRMED</h1>
            <h1 style={{ color: "orange" }}>
              <CountUp start={cases - 100} end={cases} duration={4} />
            </h1>
            <h1>TOTAL DEATHS</h1>
            <h1 style={{ color: "red" }}>
              {" "}
              <CountUp start={deaths - 100} end={deaths} duration={4} />
            </h1>
            <h1>TOTAL RECOVERED</h1>
            <h1 style={{ color: "green" }}>
              {" "}
              <CountUp start={recovered - 100} end={recovered} duration={4} />
            </h1>
          </div>
        </Col>
        <Col md="auto">
          <div className="Flags">
            <h2>CA</h2>
            <Link to={{ pathname: "/country", props: { name: "Canada" } }}>
              <img src={CA} alt="Canada" />
            </Link>

            <h2>USA</h2>
            <Link to={{ pathname: "/country", props: { name: "USA" } }}>
              <img src={USA} alt="USA" />
            </Link>
            <h2>UK</h2>
            <Link to={{ pathname: "/country", props: { name: "UK" } }}>
              <img src={UK} alt="UK" />
            </Link>
            <h2>CH</h2>
            <Link to={{ pathname: "/country", props: { name: "China" } }}>
              <img src={CH} alt="China" />
            </Link>

            <h2>NIG</h2>
            <Link to={{ pathname: "/country", props: { name: "Nigeria" } }}>
              <img src={CA} alt="Nigeria" />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
