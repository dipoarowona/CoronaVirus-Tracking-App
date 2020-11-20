import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  useEffect(() => {
    fetch("/global-data")
      .then((res) => res.json())
      .then((xyx) => console.log(xyx));
  }, []);
  return <div></div>;
};

export default App;
