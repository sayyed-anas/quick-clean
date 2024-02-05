const express = require("express");
const ejs = require("ejs");
const path = require("path");

const viewsPath = path.join(__dirname, "/resources/views");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

// set Template engines
app.set("views", viewsPath);
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`listning on Porn no :- ${PORT}`);
});
