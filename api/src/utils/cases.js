const request = require("request");
require("dotenv").config({ path: __dirname + "/./../../.env" });

const GlobalCases = (callback) => {
  const options = {
    method: "GET",
    url: "https://covid-19-data.p.rapidapi.com/totals",
    headers: {
      "x-rapidapi-key": process.env.API_KEY,
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
