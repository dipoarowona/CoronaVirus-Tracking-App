import { Route, Switch } from "react-router-dom";

import Nav from "./components/navbar";
import Home from "./components/Home";
import Country from "./components/country";
import ErrorPage from "./components/404";

import "./Styles/App.css";

const App = () => {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/country" component={Country} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
};

export default App;
