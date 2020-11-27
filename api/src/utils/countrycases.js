const request = require("request");
require("dotenv").config({ path: __dirname + "/./../../.env" });

const countryData = (country, callback) => {
  const options = {
    method: "GET",
    url: "https://covid-19-data.p.rapidapi.com/country",
    qs: { name: country },
    headers: {
      "x-rapidapi-key": process.env.API_KEY,
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      useQueryString: true,
    },
  };

  request(options, (error, response) => {
    if (error || !JSON.parse(response.body)[0]) {
      callback("error in getting data for " + country);
    } else {
      const data = JSON.parse(response.body);
      callback(undefined, data[0]);
    }
  });
};

module.exports = countryData;
