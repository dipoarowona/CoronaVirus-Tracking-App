import React, { useState, useEffect } from "react";
import "./CSS/App.css";
import "./CSS/Loading.css";
function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);
    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
        setData(response_data[0].confirmed);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="whole-page">
          <div className="row country-band">
            <h1>Main Band at the top</h1>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <h1>left bar - will have 2 rows</h1>
            </div>
            <div className="col-sm-9">
              <div className="row">
                <h1>main daily chart</h1>
              </div>
              <div className="row">
                <div className="col">
                  <h1>item 1 under chart</h1>
                </div>
                <div className="col">
                  <h1>item 2 under chart</h1>
                </div>
                <div className="col">
                  <h1>item 3 under chart</h1>
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
