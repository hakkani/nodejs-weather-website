const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPathDirectory = path.join(__dirname, "../templates/views/");
const partialsPathDirectory = path.join(__dirname, "../templates/partials/");

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine
app.set("view engine", "hbs");

// Cutomize handlebars engine views location
app.set("views", viewsPathDirectory);
hbs.registerPartials(partialsPathDirectory);

app.get("", (req, res) => {
  res.render("index", {
    title: "Wether",
    name: "Hakkani Md Gulam",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Hakkani Md Gulam",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "Hakkani Md Gulam",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Md Gulam Hakkani",
    errorMessage: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);

  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Md Gulam Hakkani",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
