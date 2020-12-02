import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import Chart from "./chart";

import "../Styles/country.css";

const Country = (props) => {
  const [name, setName] = useState("Canada");
  const [xdata, setXData] = useState([]);
  const [ydata, setYData] = useState([]);
  const [cases, setCases] = useState(0);
  const [critical, setCritical] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  const updateGraph = (cat, hist) => {
    fetch(`/country-graph-data?category=${cat}&history=${hist}&country=${name}`)
      .then((res) => res.json())
      .then((Jsondata) => {
        setXData(Object.keys(Jsondata));
        setYData(Object.values(Jsondata));
      });
  };

  const fetchCurrentData = (callback) => {
    fetch(`/country-data?country=${name}`)
      .then((res) => res.json())
      .then((Jsondata) => {
        callback(Jsondata);
      });
  };

  useEffect(() => {
    try {
      setName(props.location.props.name);
      fetch(
        "/country-graph-data?category=cases&history=30&country=" +
          props.location.props.name
      )
        .then((res) => res.json())
        .then((Jsondata) => {
          setXData(Object.keys(Jsondata));
          setYData(Object.values(Jsondata));
        });
    } catch (err) {
      setName(name);
      fetch("/country-graph-data?category=cases&history=30&country=Canada")
        .then((res) => res.json())
        .then((Jsondata) => {
          setXData(Object.keys(Jsondata));
          setYData(Object.values(Jsondata));
        });
    }

    fetchCurrentData((data) => {
      setCases(data.confirmed);
      setCritical(data.critical);
      setDeaths(data.deaths);
      setRecovered(data.recovered);
    });

    //fetch data using name
  }, [name]);

  return (
    <div className="country-page">
      <Row>
        <Col>
          <div>
            <Row>
              <Card className="country-name">
                <h1>{name}</h1>
              </Card>
            </Row>
            <Row>
              <Card className="main-data-card">
                <Row style={{ marginTop: "8%" }}>
                  <div className="main-data">
                    <h3>Total Cases</h3>
                    <h3 style={{ color: "white" }}>{cases}</h3>
                  </div>
                  <div className="main-data">
                    <h3>Critcal Cases</h3>
                    <h3 style={{ color: "orange" }}>{critical}</h3>
                  </div>
                </Row>
                <Row id="bottom-main-data-row">
                  <div className="main-data">
                    <h3>Deaths</h3>
                    <h3 style={{ color: "red" }}>{deaths}</h3>
                  </div>
                  <div className="main-data">
                    <h3>Recovered</h3>
                    <h3 style={{ color: "green" }}>{recovered}</h3>
                  </div>
                </Row>
              </Card>
            </Row>
            <Row>
              <Card className="main-data-card">
                <h1>Even More data</h1>
              </Card>
            </Row>
          </div>
        </Col>
        <Col>
          <Row>
            <Card className="main-chart">
              <div style={{ width: "90%", margin: "0 auto" }}>
                <Chart x={xdata} y={ydata} />
                {/*Create little bar below to change chart data */}
              </div>
            </Card>
          </Row>

          <Row>
            <Card className="under-chart-data">
              <h1>Even More data</h1>
            </Card>
            <Card className="under-chart-data">
              <h1>Even More data</h1>
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Country;
