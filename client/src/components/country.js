import React, { useEffect, useState } from "react";

import Chart from "./chart";

const Country = (props) => {
  const [name, setName] = useState("Canada");
  const [xdata, setXData] = useState([]);
  const [ydata, setYData] = useState([]);
  console.log(props);
  useEffect(() => {
    try {
      setName(props.location.props.name);
      fetch(
        "/country-graph-data?category=cases&history=90&country=" +
          props.location.props.name
      )
        .then((res) => res.json())
        .then((Jsondata) => {
          setXData(Object.keys(Jsondata));
          setYData(Object.values(Jsondata));
        });
    } catch (err) {
      setName(name);
      fetch("/country-graph-data?category=cases&history=90&country=Canada")
        .then((res) => res.json())
        .then((Jsondata) => {
          setXData(Object.keys(Jsondata));
          setYData(Object.values(Jsondata));
        });
    }

    //fetch data using name
  }, [name]);

  return (
    <div>
      <h1>Country: {name}</h1>
      <div style={{ width: "1400px" }}>
        <Chart x={xdata} y={ydata} />
      </div>
    </div>
  );
};

export default Country;
