var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Teacher = require("./models/Teacher"),
  Student = require("./models/Student"),
  Admin = require("./models/Admin"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
const { request } = require("express");

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
      } else {
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
      dob: req.body.dob,
      grad_date: req.body.grad_date,
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

app.get("/quiz", (req, res) => {
  res.render("quiz");
});

app.post("/data/quiz", (req, res) => {
  var questions = [];
  var answers = [];
  var correct = [];
  if (req.body.question1) {
    questions.push(req.body.question1);
    answers.push(req.body.answer11);
    answers.push(req.body.answer12);
    answers.push(req.body.answer13);
    answers.push(req.body.answer14);
    correct.push(req.body.correct1);
  }
  if (req.body.question2) {
    questions.push(req.body.question2);
    answers.push(req.body.answer21);
    answers.push(req.body.answer22);
    answers.push(req.body.answer23);
    answers.push(req.body.answer24);
    correct.push(req.body.correct2);
  }
  if (req.body.question3) {
    questions.push(req.body.question3);
    answers.push(req.body.answer31);
    answers.push(req.body.answer32);
    answers.push(req.body.answer33);
    answers.push(req.body.answer34);
    correct.push(req.body.correct3);
  }
  console.log(answers);
  console.log(questions);
  console.log(correct);
});
