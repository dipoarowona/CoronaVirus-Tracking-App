import React, { useEffect, useState } from "react";

const Country = (props) => {
  const [name, setName] = useState("");
  useEffect(() => {
    try {
      setName(props.location.props.name);
    } catch (err) {
      setName("Canada");
    }
    //fetch data using name
  }, []);

  return (
    <div>
      <h1>Country: {name}</h1>
    </div>
  );
};

export default Country;
