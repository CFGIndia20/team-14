var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Teacher = require("./models/Teacher"),
  Student = require("./models/Student"),
  Admin = require("./models/Admin"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

var app = express();
app.listen(3000, () => {
  console.log("Server is running");
});

mongoose
  .connect(
    "mongodb+srv://alumniadmin:iamthebest@alumni-igjrr.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use("student", new localStrategy(Student.authenticate()));
passport.use("teacher", new localStrategy(Teacher.authenticate()));
passport.use("admin", new localStrategy(Admin.authenticate()));
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  if (user != null) {
    done(null, user);
  }
});
// app.use(flash());

app.use(
  require("express-session")({
    secret: "hackathon is on!!",
    resave: false,
    saveUninitialized: false,
  })
);

isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
//============================>Landing Page

app.get("/",(req,res)=>{
  res.render("home")
})

//==============Registration Page

app.post("/register", (req, res) => {
  console.log(req.body);
  if (req.body.category == "Teacher") {
    var newUser = new Teacher({
      username: req.body.username,
      slot: req.body.slot,
      category: req.body.category,
    });
    Teacher.register(newUser, req.body.password, async function (err, user) {
      if (err) {
        console.log(err);
        // req.flash("error1", "Username already exists");
        res.redirect("/login");
      } 
      else {
        await Teacher.authenticate("local")(req, res, function () {
          res.redirect("/dashboard");
          res.send("Registered");
        });
      }
    });
  } else if (req.body.category == "Student") {
    var newUser = new Student({
      name: req.body.name,
      category: req.body.category,
      username: req.body.username,
      // dob: req.body.dob,
      // grad_date: req.body.grad_date,
      experience: req.body.experience,
      hsc: req.body.hsc,
      ssc: req.body.ssc,
    });
    Student.register(newUser, req.body.password, async function (err, user) {
      if (err) {
        console.log(err);
        // req.flash("error1", "Username already exists");
        res.redirect("/login");
      } else {
        await Student.authenticate("local")(req, res, function () {
          res.redirect("/dashboard");
          res.send("Registered");
        });
      }
    });
    console.log(req.body.name);
    console.log(req.body.category);
    console.log(req.body.email);
    console.log(req.body.dob);
    console.log(req.body.qualification);
    console.log(req.body.grad_date);
    console.log(req.body.experience);
    console.log(req.body.hsc);
    console.log(req.body.ssc);
  } else {
    var newUser = new Admin({
      username: req.body.email,
      category: req.body.category,
    });
    Admin.register(newUser, req.body.password, async function (err, user) {
      if (err) {
        console.log(err);
        // req.flash("error1", "Username already exists");
        res.redirect("/login");
      } else {
        await Admin.authenticate("local")(req, res, function () {
          res.redirect("/dashboard");
          res.send("Registered");
        });
      }
    });
  }
});


app.post(
  "/login-student",
  passport.authenticate("student", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

app.post(
  "/login-teacher",
  passport.authenticate("teacher", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

app.post(
  "/login-admin",
  passport.authenticate("admin", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

app.get("/dashboard", (req, res) => {
  res.render("home");
});

app.get("/TeacherDashboard", (req, res) => {
  res.render("TeacherDashboard");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/StudentRegisterPage", (req, res) => {
  res.render("StudentRegisterPage");
});

app.get("/Teacher-Registration", (req, res) => {
  res.render("Teacher-Registration");
});
