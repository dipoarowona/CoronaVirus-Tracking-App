import React from "react";
import Row from "react-bootstrap/Row";

const SingleData = (props) => {
  return (
    <div
      style={{
        marginTop: "3%",
      }}
    >
      <Row
        style={{
          margin: "auto",
          background: "rgba(27, 38, 83, 0.22)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <h4 style={{ fontSize: "19px", float: "left" }}>{props.date}</h4>
          <h4 style={{ fontSize: "19px", float: "right" }}>{props.value}</h4>
        </div>
      </Row>
    </div>
  );
};

export default SingleData;
