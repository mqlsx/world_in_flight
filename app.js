var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");


// models and functions
var User = require("./models/Buyer");

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



// var campgrounds = [
//     {name: "m1", image: "https://s17-us2.ixquick.com/cgi-bin/serveimage?url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRciYzQ_UFCM7zj86wSrL-GLo0i_S1LYasxYXbj_UyYLOr09WxZ&sp=4e0364ce2a157be659febe7a4048c642&anticache=795995"},
//     {name: "m2", image: "https://s17-us2.ixquick.com/cgi-bin/serveimage?url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRVNB5620cOts_mdl6vZyjnZycw6rExN8Uf5mDPRl0pe_YAUT1f&sp=8a1879e87420e412d809f69bdd31c2f0&anticache=168310"},
//     {name: "m3", image: "https://s17-us2.ixquick.com/cgi-bin/serveimage?url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRvh9s-dDgshepKLh07aprZoOW0QU26mQANRXqu2GCDXnppoRjb&sp=db7c80673d9cb31db3983e3e0f307337&anticache=267981"}
//     ];
