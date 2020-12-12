import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import Chart from "./chart";
import SingleData from "../components/SingleData";
import { useRouteMatch } from "react-router-dom";
import "../Styles/country.css";

const Country = (props) => {
  const match = useRouteMatch();
  const [name, setName] = useState(match.url.replace("/country/", ""));
  const [data, setData] = useState(null);

  const [xdata, setXData] = useState([]);
  const [ydata, setYData] = useState([]);
  const [xdataD, setXDataD] = useState([]);
  const [ydataD, setYDataD] = useState([]);
  const [xdataR, setXDataR] = useState([]);
  const [ydataR, setYDataR] = useState([]);

  const [cases, setCases] = useState(0);
  const [critical, setCritical] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  // const updateGraph = (cat, hist) => {
  //   fetch(`/country-graph-data?category=${cat}&history=${hist}&country=${name}`)
  //     .then((res) => res.json())
  //     .then((Jsondata) => {
  //       setXData(Object.keys(Jsondata));
  //       setYData(Object.values(Jsondata));
  //     });
  // };

  const fetchCurrentData = (cname, callback) => {
    fetch(`/country-data?country=${cname}`)
      .then((res) => res.json())
      .then((Jsondata) => {
        callback(Jsondata);
      });
  };

  useEffect(() => {
    setName(match.url.replace("/country/", ""));
    var nname = match.url.replace("/country/", "");
    //cases graph data
    fetch("/country-graph-data?category=cases&history=30&country=" + nname)
      .then((res) => res.json())
      .then((Jsondata) => {
        setData(Jsondata);
        setXData(Object.keys(Jsondata));
        setYData(Object.values(Jsondata));
      });
    //deaths graph data
    fetch("/country-graph-data?category=new_cases&history=30&country=" + nname)
      .then((res) => res.json())
      .then((Jsondata) => {
        setXDataD(Object.keys(Jsondata));
        setYDataD(Object.values(Jsondata));
      });
    //recovered graphdata
    fetch("/country-graph-data?category=new_deaths&history=30&country=" + nname)
      .then((res) => res.json())
      .then((Jsondata) => {
        setXDataR(Object.keys(Jsondata));
        setYDataR(Object.values(Jsondata));
      });
    fetchCurrentData(nname, (data) => {
      setCases(data.confirmed);
      setCritical(data.critical);
      setDeaths(data.deaths);
      setRecovered(data.recovered);
    });
  }, [match.url]);

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
                    {cases === 0 ? (
                      <div class="lds-dual-ring"></div>
                    ) : (
                      <>
                        <h3>Total Cases</h3>
                        <h3 style={{ color: "white" }}>
                          {formatNumber(cases)}
                        </h3>
                      </>
                    )}
                  </div>
                  <div className="main-data">
                    {cases === 0 ? (
                      <div class="lds-dual-ring"></div>
                    ) : (
                      <>
                        <h3>Critical Cases</h3>
                        <h3 style={{ color: "orange" }}>
                          {formatNumber(critical)}
                        </h3>
                      </>
                    )}
                  </div>
                </Row>
                <Row id="bottom-main-data-row">
                  <div className="main-data">
                    {cases === 0 ? (
                      <div class="lds-dual-ring"></div>
                    ) : (
                      <>
                        <h3>Deaths</h3>
                        <h3 style={{ color: "red" }}>{formatNumber(deaths)}</h3>
                      </>
                    )}
                  </div>
                  <div className="main-data">
                    {cases === 0 ? (
                      <div class="lds-dual-ring"></div>
                    ) : (
                      <>
                        <h3>Recovered</h3>
                        <h3 style={{ color: "green" }}>
                          {formatNumber(recovered)}
                        </h3>
                      </>
                    )}
                  </div>
                </Row>
              </Card>
            </Row>
            <Row>
              <Card className="main-data-card">
                <div>
                  <h3>30 Day History of Cases</h3>
                </div>
                <div
                  className="new-cases"
                  style={{
                    overflowY: "auto",
                    width: "400px",
                    background: "transparent",
                    margin: "auto",
                  }}
                >
                  {data === null ? (
                    <div class="lds-dual-ring"></div>
                  ) : (
                    <>
                      {Object.keys(data)
                        .slice(-30)
                        .reverse()
                        .map((key, index) => (
                          <SingleData
                            key={key}
                            date={key}
                            value={formatNumber(data[key])}
                          />
                        ))}
                    </>
                  )}
                </div>
              </Card>
            </Row>
          </div>
        </Col>
        <Col>
          <Row>
            <Card className="main-chart">
              {!data ? (
                <div style={{ margin: "auto", width: "35px" }}>
                  <div class="lds-dual-ring"></div>
                </div>
              ) : (
                <div style={{ width: "90%", marginLeft: "0 auto" }}>
                  <Chart cat={"Total Cases"} x={xdata} y={ydata} />
                  {/*Create little bar below to change chart data */}
                </div>
              )}
            </Card>
          </Row>

          <Row>
            <Card className="under-chart-data">
              {!data ? (
                <div style={{ margin: "auto", width: "35px" }}>
                  <div class="lds-dual-ring"></div>
                </div>
              ) : (
                <div style={{ width: "90%", margin: "auto auto" }}>
                  <Chart cat={"New Cases"} x={xdataD} y={ydataD} />
                  {/*Create little bar below to change chart data */}
                </div>
              )}
            </Card>
            <Card className="under-chart-data">
              {!data ? (
                <div style={{ margin: "auto", width: "35px" }}>
                  <div class="lds-dual-ring"></div>
                </div>
              ) : (
                <div style={{ width: "90%", margin: "auto auto" }}>
                  <Chart cat={"New Deaths"} x={xdataR} y={ydataR} />
                  {/*Create little bar below to change chart data */}
                </div>
              )}
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

function formatNumber(num) {
  if (num === undefined) {
    num = 0;
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export default Country;
