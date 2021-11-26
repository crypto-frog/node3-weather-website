const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// const url =
//   "http://api.weatherstack.com/current?access_key=7a5712f27fa9dcaeb1f6b9252afe5d71&query=37.8267,-122.4233&units=f";

//   "http://api.weatherstack.com/current?access_key=7a5712f27fa9dcaeb1f6b9252afe5d71&query=-75.7088,44.1545&units=f";

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service...");
//   } else if (response.body.error) {
//     console.log("unable to find location");
//   } else {
//     const temperature = response.body.current.temperature;
//     const feelsLike = response.body.current.feelslike;
//     const weather_descriptions = response.body.current.weather_descriptions[0];
//     console.log(temperature, feelsLike, weather_descriptions);
//   }
//   //console.log(error);
// });

// const url2 =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYnJhaWdldG9yaSIsImEiOiJja3c1YWk3Z2IxNDJnMm9tbnNuc3V6emp1In0.PRdx-jvD01k-2WC2qQkFug&limit=1";

// request({ url: url2, json: true }, (error, response) => {
//   if (error) {
//     console.log("Cannot connect to server");
//   } else if (response.body.features.length === 0) {
//     console.log("cannot find location");
//   } else {
//     const latitude = response.body.features[0].center[0];
//     const longitude = response.body.features[0].center[1];
//     console.log(response.body.features[0].center);
//   }
// });

const place = process.argv[2];
if (place) {
  geocode(place, (error, { latitude, longitude, location } = {}) => {
    if (error) return console.log(error);
    forecast(latitude, longitude, (error, fdata) => {
      if (error) return console.log(error);
      console.log(location);
      console.log(fdata);
    });
  });
} else console.log("no location provided, try again");
