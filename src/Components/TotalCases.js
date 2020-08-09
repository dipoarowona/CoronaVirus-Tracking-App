import React from "react";

const TotalCases = (props) => {
  return (
    <div className="card main-covid-info">
      <div className="card-body">
        <h1 id="total-cases-heading">{props.name}</h1>
        <h1 id="total-cases-number" style={{ color: props.color }}>
          {props.cases}
        </h1>
      </div>
    </div>
  );
};

export default TotalCases;
