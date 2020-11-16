const e = require("express");
const request = require("request");

const GlobalCases = (callback) => {
  const options = {
    method: "GET",
    url: "https://covid-19-data.p.rapidapi.com/totals",
    headers: {
      "x-rapidapi-key": "491f353b91msh4d6e560099cab14p16dc45jsn2ebbe77bc738",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      useQueryString: true,
    },
  };

  request(options, (error, response) => {
    if (error) {
      callback("There is an error");
    } else {
      const data = JSON.parse(response.body)[0];
      callback(undefined, data);
    }
  });
};

module.exports = GlobalCases;
