const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "http://localhost:5000/auth/git/redirect"
},
    function (accessToken, refreshToken, profile, done) {
        // check if user already exists in our own db
        User.findOne({ user_name: profile.displayName }, function (err, user) {

            if (err) {
                return done(err);
            }
        }).then((currentUser) => {
            if (currentUser) {
                // already have this user

                done(null, currentUser);
            } else {
                // if not, create user in our db
                console.log('profile : ', profile);
                new User({
                    password: profile.id,
                    user_name: profile.displayName,
                    email: profile.emails[0].value
                    //password: profile.password

                })
                    .save()
                    .then((newUser) => {
                        done(null, newUser);
                    });
            }
        });
    }
));

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
      passReqToCallback: true,
    },
      function (request, accessToken, refreshToken, profile, done) {
          
      // check if user already exists in our own db
          User.findOne({ user_name: profile.displayName }, function (err, user) {
              
        if (err) {
          return done(err);
        }
      }).then((currentUser) => {
        if (currentUser) {
          // already have this user

          done(null, currentUser);
        } else {
            // if not, create user in our db
            console.log('profile : ', profile);
            new User({
                password: profile.id,
              user_name: profile.displayName,
              email: profile.emails[0].value
              //password: profile.password
            
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
