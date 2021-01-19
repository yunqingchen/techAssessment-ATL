const express = require('express');
const app = express();
const path = require("path");

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(require('method-override')('_method'));
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files like css
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/articles", require("./routes/articles"));
app.use("/authors", require("./routes/authors"));

app.get("/", function (req, res) {
  res.redirect("/articles/");
});

module.exports = app;
