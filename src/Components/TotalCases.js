import React from "react";

const TotalCases = (props) => {
  return (
    <div className="card main-covid-info">
      <div className="card-body">
        <h1>{props.cases}</h1>
      </div>
    </div>
  );
};

export default TotalCases;
