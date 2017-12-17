var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");


// models and functions
var User = require("./models/User");

// mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/v1", {useMongoClient: true});

// app setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "YelpCamp v11_all, author: Yize Pang",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// a middleware to set currentUser for every route
app.use(function(req, res, next){
    console.log("currentUser:" + req.user);
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
    
// var commentRoutes = require("./routes/comments");
// var campgroundRoutes = require("./routes/campgrounds");
var indexRoute = require("./routes/index");
// var loginRoute = require("./routes/login");
// var registerRoute = require("./routes/register");

app.use("/", indexRoute);
// app.use("/login", loginRoute);
// app.use("/register", registerRoute);
// app.use("/campgrounds", campgroundRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);


// app.listen(3000, "127.0.0.1", function(){
//     console.log("Now the server is running!")
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Now the server is running!")
});


