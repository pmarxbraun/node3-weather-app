const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths to Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static folder /public
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Phil braun",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Phil Brown",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Phil braun",
    alert: "This is an alert, be careful guys !",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({ error: "You must provide an adresse MTF!" });
  }

  geocode(req.query.adress, (error, { place_name_fr, lat, long } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(long, lat, (error, { temp, prec }) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        name: place_name_fr,
        temperature: temp + "°C",
        rain: prec,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("You must provide a search query");
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Phil braun",
    msg: "No help article found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Phil braun",
    msg: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
