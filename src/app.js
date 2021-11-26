const express = require("express");
const path = require("path");
const hbs = require("hbs");
//const { request } = require("http");
//const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

// Define paths for Express config
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jonathan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me here",
    name: "created by jonathan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help_message: "here is a help message for you to be helped by",
    name: "created by Jonathan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Provide and address please" });
  }
  //---------------------
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, fdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          latitude,
          longitude,
          fdata,
        });
        // console.log(location);
        // console.log(fdata);
      });
    }
  );
  //---------------------
  // res.send({
  //   forcast: "this is the forcast",
  //   address: req.query.address,
  //   name: "created by Jonathan",
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error_message: "help article not found",
    name: "jonathan",
    title: "help 404 page",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error_message: "page not found",
    name: "jonathan",
    title: "404 page",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
