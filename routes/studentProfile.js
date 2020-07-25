import express from 'express';
import * as studentController from '../controllers/student/studentProfile';
import { Students } from '../model/studentProfile';
import { Admins } from '../model/admin';
import { Teachers } from '../model/teacher';
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const path = require('path');

passport.use("student", new localStrategy(Students.authenticate()));
passport.use("teacher", new localStrategy(Teachers.authenticate()));
passport.use("admin", new localStrategy(Admins.authenticate()));
passport.serializeUser((user, done) => {
  done(null, user);
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

passport.deserializeUser((user, done) => {
  if (user != null) {
    done(null, user);
  }
});

const router = express.Router();

router.get(
  '/login',
  (req, res) => {
    console.log('----------login');
    res.sendFile('login.html');
  }
);

router.post(
  '/register',
  studentController.registration,
);

router.post(
  '/login-student',
  passport.authenticate("student", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => { }
);

router.post(
  '/login-teacher',
  passport.authenticate("teacher", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => { }
);

router.post(
  '/login-admin',
  passport.authenticate("admin", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => { }
);

router.get(
  '/dashboard', isLoggedIn,
  (req, res) => {
    res.render("home");
  }
);

module.exports = router;
