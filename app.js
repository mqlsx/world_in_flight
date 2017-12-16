var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Campground = require("./models/campground"),
    seedDB      = require("./seeds"),
    methodOveride = require("method-override"),
    flash       = require("connect-flash"),
    Comment     = require("./models/comment");
    
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");



seedDB();
mongoose.connect("mongodb://localhost/v11");

//mongodb://yize:yelpcampv11@ds149724.mlab.com:49724/yelpcamp

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
app.use(methodOveride("_method"));
app.use(require("express-session")({
    secret: "once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


var campgrounds = [
    {name: "m1", image: "https://s17-us2.ixquick.com/cgi-bin/serveimage?url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRciYzQ_UFCM7zj86wSrL-GLo0i_S1LYasxYXbj_UyYLOr09WxZ&sp=4e0364ce2a157be659febe7a4048c642&anticache=795995"},
    {name: "m2", image: "https://s17-us2.ixquick.com/cgi-bin/serveimage?url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRVNB5620cOts_mdl6vZyjnZycw6rExN8Uf5mDPRl0pe_YAUT1f&sp=8a1879e87420e412d809f69bdd31c2f0&anticache=168310"},
    {name: "m3", image: "https://s17-us2.ixquick.com/cgi-bin/serveimage?url=http%3A%2F%2Ft0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRvh9s-dDgshepKLh07aprZoOW0QU26mQANRXqu2GCDXnppoRjb&sp=db7c80673d9cb31db3983e3e0f307337&anticache=267981"}
    ];





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Now the server is running!")
});