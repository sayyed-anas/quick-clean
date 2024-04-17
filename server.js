require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const routes = require("../PizzaApp/routes/web");
const mongoose = require("mongoose");
const mongodbSchema = require("./app/models/cartModel");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");

// views Directory Path
const viewsPath = path.join(__dirname, "/resources/views");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/pizza");
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database Connected");
});

let store = new MongoStore({
  mongoUrl: "mongodb://localhost:27017/pizza",
  collection: "sessions",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// session config

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

app.use(flash());

// Passport Config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(expressLayout);

// static path of All resources
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set Template engines
app.set("views", viewsPath);
app.set("view engine", "ejs");

// Router Middleware
app.use(routes);

// Create Server
app.listen(PORT, () => {
  console.log(`listning on Port no :- ${PORT}`);
});
