import React, { useState, useEffect } from "react";
import "./CSS/App.css";
import "./CSS/Loading.css";
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadData();
    setLoading(false);
  }, []);

  const loadData = () => {
    fetch("https://covid-19-data.p.rapidapi.com/docs.json", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "491f353b91msh4d6e560099cab14p16dc45jsn2ebbe77bc738",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <h1>Thats Crazy</h1>
        </div>
      )}
    </div>
  );
}

export default App;
