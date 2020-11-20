const path = require("path");
const express = require("express");

const globalCases = require("./utils/cases");
const countryCases = require("./utils/countrycases");

const app = express();
const port = process.env.PORT || 5000;

app.get("", (req, res) => {
  res.send("<h1>Covid App</h1>");
});

/*API ENDPOINTS*/

//current global data -> done
app.get("/global-data", (req, res) => {
  globalCases((error, data) => {
    if (error) {
      return res.send({ error });
    }
    res.send([data]);
  });
});
app.get("/global-data/*", (req, res) => {
  res.send({ error: "API ENDPOINT DOES NOT EXIST" });
});

//current data for each country -> done
app.get("/country-data", (req, res) => {
  if (!req.query.country) {
    return res.send({ error: "please provide country" });
  }
  countryCases(req.query.country, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    res.send(data);
    console.log("got current data for: " + req.query.country);
  });
});
app.get("/country-data/*", (req, res) => {
  res.send({ error: "API ENDPOINT DOES NOT EXIST" });
});

app.get("/global-graph-data", (req, res) => {
  if (!req.query.category || !req.query.history) {
    return res.send({ error: "please provide all query parameters" });
  }
  res.send({
    message:
      "getting historical data for global " +
      req.query.category +
      " in the past " +
      req.query.history +
      " days",
  });
  /*
    querys -> category(confirmed, active,death,..),history (30d,90d,120d inception)
    */
});
app.get("/global-graph-data/*", (req, res) => {
  res.send({ error: "API ENDPOINT DOES NOT EXIST" });
});

app.get("/country-graph-data", (req, res) => {
  if (!req.query.country || !req.query.category || !req.query.history) {
    return res.send({ error: "please provide all query parameters" });
  }

  res.send({
    message:
      "getting historical data for " +
      req.query.country +
      " " +
      req.query.category +
      " in the past " +
      req.query.history +
      " days",
  });
  /*
    querys -> category(confirmed,active,death),country,history (30d,90d,120d inception)
        return data of cases or 
    */
});
app.get("/country-graph-data/*", (req, res) => {
  res.send({ error: "API ENDPOINT DOES NOT EXIST" });
});

app.get("*", (req, res) => {
  res.send("<h1>404 page dont exist</h1>");
});

app.listen(port, () => {
  console.log("Server is up on " + port);
});
