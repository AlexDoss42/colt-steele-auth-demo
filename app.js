var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.use(require("express-session")({
  secret: "asdfa1240i9x^*!#^rn12048ua~@#dfcaser8_2935nsdasdf",
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
  res.render("home");
});

app.get("/secret", function(req, res){
  res.render("secret");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
      });
    }
  });
});

app.get("/login", function(req, res){

});

app.get("/login", function(req, res){

});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Its over Anakin,  I have the high Port")
});