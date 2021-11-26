const request = require("request");

const forecast = function (latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=7a5712f27fa9dcaeb1f6b9252afe5d71&query=${longitude},${latitude}&units=f`;
  console.log(url);
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(error, undefined);
    } else if (response.body.error) {
      callback(response.body.error, undefined);
    } else {
      callback(undefined, response.body.current);
    }
  });
};

module.exports = forecast;
