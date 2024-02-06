const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");

const viewsPath = path.join(__dirname, "/resources/views");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// set Template engines
app.use(expressLayout);
app.set("views", viewsPath);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cart", (req, res) => {
  res.render("customers/cart");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  res.render("auth/Register");
});

app.listen(PORT, () => {
  console.log(`listning on Porn no :- ${PORT}`);
});
