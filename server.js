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
app.use(session({ secret: "catsfoodz", resave: false, saveUninitialized : false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login',
  function(req, res){
    res.render('login');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.get("/api/hello", passport.authenticate("local"), (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get("/version", (req, res) => {
  res.send({ version: "1.0" });
});

app.listen(5000, () => console.log("Example app listening on port 5000!"));
