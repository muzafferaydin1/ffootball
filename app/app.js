const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const config = require("./config/database");

mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Check for DB errors
db.on("error", function (err) {
  console.log(err);
});

// Init App
const app = express();

// Bring in Models
let Article = require("./models/article");
let Footballer = require("./models/footballer");

// Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Express Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Express Messages Middleware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

// Passport Config
require("./config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Home Route
app.get("/", function (req, res) {
  Footballer.find({}, function (err, footballers) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Footballers",
        footballers: footballers,
      });
    }
  });
});
// app.get("/team", function (req, res) {
//   Footballer.find({}, function (err, footballers) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("team", {
//         title: "Team",
//         footballers: footballers,
//       });
//     }
//   });
// });



// Route Files
let articles = require("./routes/articles");
let apis = require("./routes/apis");
let team = require("./routes/teams");
let users = require("./routes/users");
app.use("/articles", articles);
app.use("/users", users);
app.use("/team", team);
app.use("/apis", apis);

// Start Server
app.listen(3000, function () {
  console.log("Server started on port 3000...");
});
