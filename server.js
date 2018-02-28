const express = require("express");
const app = express();

var session = require("express-session");
var bodyParser = require("body-parser");

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var config = require("./config");

require("./server/models").connect(config.dbUri);
const User = require("mongoose").model("User");

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(express.static("server/static"));
app.use(session({ secret: "catsfoodz" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/hello", passport.authenticate("local"), (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.listen(5000, () => console.log("Example app listening on port 5000!"));
