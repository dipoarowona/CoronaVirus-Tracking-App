import React, { useState, useEffect } from "react";

import TotalCasesCard from "./Components/TotalCases";
import MainChartCard from "./Components/MainChart";
import UnderChartCard from "./Components/underchart";
import FurtherInfoCard from "./Components/furtherinfo";
import CountryCard from "./Components/countryCard";

import "./CSS/App.css";
import "./CSS/Cards.css";
import "./CSS/Loading.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    active: 0,
    confirmed: 0,
    critical: 0,
    deaths: 0,
    recovered: 0,
  });

  useEffect(() => {
    setLoading(true);
    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const loadData = () => {
    fetch("https://covid-19-data.p.rapidapi.com/totals?format=json", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "491f353b91msh4d6e560099cab14p16dc45jsn2ebbe77bc738",
      },
    })
      .then((response) => response.json())
      .then((response_data) => {
        setData({
          active:
            response_data[0].confirmed -
            response_data[0].deaths -
            response_data[0].recovered,
          confirmed: response_data[0].confirmed,
          critical: response_data[0].critical,
          deaths: response_data[0].deaths,
          recovered: response_data[0].recovered,
        });
      });
  };

  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="whole-page">
          <div className="title" style={{ textAlign: "center" }}>
            <h1 id="page-title">COVID-19</h1>
          </div>
          <div className="row">
            <CountryCard />
          </div>

          <div className="row">
            <div className="col-sm-3 total-cases">
              <div className="row">
                <TotalCasesCard
                  color="orange"
                  name="Total Cases"
                  cases={data.confirmed}
                />
              </div>
              <div className="row">
                <TotalCasesCard color="red" name="Deaths" cases={data.deaths} />
              </div>
              <div className="row">
                <TotalCasesCard
                  color="green"
                  name="Recovered"
                  cases={data.recovered}
                />
              </div>
              <div className="row">
                <TotalCasesCard
                  color="yellow"
                  name="Active"
                  cases={data.active}
                />
              </div>
              <div className="row">
                <TotalCasesCard
                  color="purple"
                  name="Critical"
                  cases={data.critical}
                />
              </div>
            </div>
            <div className="col-sm-9">
              <div className="row">
                <MainChartCard />
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <UnderChartCard />
                </div>
                <div className="col-sm-3">
                  <UnderChartCard />
                </div>
                <div className="col">
                  <FurtherInfoCard />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h1>first col</h1>
            </div>
            <div className="col">
              <h1>second col</h1>
            </div>
            <div className="col">
              <h1>third col</h1>
            </div>
            <div className="col">
              <h1>fourth col</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
