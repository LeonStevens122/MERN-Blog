const express = require("express");
require("dotenv").config(); // for loading environment variables
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require('cors');
//const  registerUser = require("./client/src/actions/authActions");

const axios = require('axios');
const users = require("./routes/api/users");
require("./config/passport-setup");
const authRoutes = express.Router();
const app = express();


app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoUser = process.env.MONGOUSER;
const mongoPassword = process.env.MONGOPASS;

// connect to URI
const MongoClient = require("mongodb").MongoClient;
const MONGO_URI =
    "mongodb+srv://" +
    mongoUser +
    ":" +
    mongoPassword +
    "@hyperion-dev-leon-stevens-webdev-qiwgg.mongodb.net/Todo?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("Mongo Connection successful"))
    .catch(err => console.log("err"));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/api/users", users);
app.use("/api/posts/", require("./routes/api/posts"));
app.use("/auth", authRoutes);


// Google Authentication route

authRoutes.route("/github").get(

    passport.authenticate('github'));

app.get('/auth/git/redirect',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000/blog");
    });

authRoutes.route("/google").get(
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);


// Authentication - Redirect
authRoutes
    .route("/google/redirect")
    .get(passport.authenticate("google"), (req, res) => {
        loggedInUser = req.user;
        const user_name = req.user.user_name;
        const email = req.user.email;
        const password = req.user.password;

        console.log(' Logged In User : ', loggedInUser);
        axios
            .post("/api/users/signup", loggedInUser)
            .then(res => {
               
                localStorage.setItem(
                    "loginMessage",
                    "Successfully registered. Login to continue"
                );
                res.redirect("http://localhost:3000/login");
            })
        

        res.redirect("http://localhost:3000/blog");
    });


if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
