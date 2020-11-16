const request = require("request");

const countryData = (country, callback) => {
  const options = {
    method: "GET",
    url: "https://covid-19-data.p.rapidapi.com/country",
    qs: { name: country },
    headers: {
      "x-rapidapi-key": "491f353b91msh4d6e560099cab14p16dc45jsn2ebbe77bc738",
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
