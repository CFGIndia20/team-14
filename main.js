var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Teacher = require("./models/Teacher"),
  Student = require("./models/Student"),
  UnallocatedSlots = require("./models/UnallocatedSlots"),
  RunningSlots = require("./models/RunningSlots"),
  Batch = require("./models/Batch"),
  Admin = require("./models/Admin"),
  Job = require("./models/Job"),
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
 
///++++++++++++++++++Update the Level of the Student on the basis of the test

app.post("/:StudentId/EnterStudentLevel",(req,res) => {
  console.log(req.body);
  console.log(req.params.StudentId);
  //Send the Student BaseLineTest Score and 
  var level;
  const score = parseInt(req.body.score);
  console.log(score);
  if(score > 70) level = "High";
  if(score >=50) level = "Mid";
  else level = "Low";
  console.log(level);
  
  //update the student database with the level of the student
  Student.findByIdAndUpdate({_id:req.params.StudentId},{level : level},function(err,student){
    if(err) console.log(err);
    else{
      console.log(student);
      //Allocation to a Dummy Batch 
      UnallocatedSlots.find({},function(err,batches){
        if(err) console.log(err);
        else{
          console.log(batches)
          console.log(Object.keys(batches).length === 0);

          if(Object.keys(batches).length === 0){
            //If we don't have any batch, we make 3 batches => 1 for each skill level
            Batch.create({Students : [],level : "Low"},function(err,batch){
              if(err) console,log(err);
              else {console.log(batch);
              UnallocatedSlots.find({},function(err,UnBatches){
                if(err) console.log(err);
                else{
                  var b = UnBatches.batches.push(batch);                  
                  UnallocatedSlots.findByIdAndUpdate({_id : UnBatches._id},{batches : b});
                }
              })}
            })
            Batch.create({Students : [],level : "Mid"},function(err,batch){
              if(err) console,log(err);
              else console.log(batch);
            })
            Batch.create({Students : [],level : "High"},function(err,batch){
              if(err) console,log(err);
              else console.log(batch);
            })
          }
        }
      })
    }
  })
  res.send("Done");
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


//++++++Temporary Ruotes++++++++++(Just to check the working in POSTMAN)
app.get("/students",(req,res)=> {
  console.log(req.body);
  Student.find({},function(err,students){
    if(err) {
      console.log(err);
      res.err(err);
    }
    else{
      res.send(students);
    }
  })
})

app.get("/batches",(req,res)=> {
  console.log(req.body);
  Batch.find({},function(err,batches){
    if(err) {
      console.log(err);
      res.err(err);
    }
    else{
      res.send(batches);
    }
  })
})

app.get("/DeleteBatches",(req,res)=> {
  console.log(req.body);
  Batch.findOneAndDelete({},function(err,batches){
    if(err) {
      console.log(err);
      res.send(err);
    }
    else{
      res.send(batches);
    }
  })
})

//++++++++++++Placement realted api's

//All the jobs Posted by the admin
app.get("/placement/jobs",(req,res)=>{
  Job.find({},(err,jobs)=>{
    if(err) res.send(err);
    else{
      res.send(jobs);
    }
  })
});

//Get all the jobs with respect to categories
app.get("/placement/jobs/:category",(req,res)=>{
  Job.find({},(err,jobs)=>{
    if(err) res.send(err);
    else{
      var Jobs = [];
      jobs.forEach((job) => {
        if(job.category === req.params.category){Jobs.push(job);}
      })
      res.send(Jobs);
    }
  })
});

//Get all the jobs which are not allocated yet
app.get("/placement/jobs/unallocated",(req,res)=>{
  console.log("sdkjvhdfv");
  Job.find({},(err,jobs)=>{
    if(err) res.send(err);
    else{
      var unAllJobs = [];
      jobs.forEach((job) => {
        if(job.allocatedTo == null){
          unAllJobs.push(job);
        }
      });
      res.send(unAllJobs);
    }
  })
});

//Post Jobs on the Placement Portal(Admin View)
app.post("/placement/jobs",(req,res)=>{
  console.log(req.body);
  Job.create(req.body,function(err,job){
    if(err) res.send(err);
    else{
      res.send(job);
    }
  })
})

app.post("/placement/apply/:jobId/:stuId",(req,res)=>{
  Job.findById({_id : req.params.jobId},function(err,job){
    if(err) res.send(err);
    else{
      var applicants = job.applicants;
      // applicants.push(req.user);
      applicants.push(req.params.stuId);
      Job.findByIdAndUpdate({_id : req.params.jobId},{applicants : applicants},function(err,job){
        res.send(job);
      })
    }
  })
})

//Delete the jobs 
app.delete("/placement/job/:jobId",(req,res)=>{
  Job.findByIdAndRemove({_id : req.params.jobId},function(err,job){
    if(err) console.log(err);
    else res.send(job);
  })
})

//Allocation of the job to a student 
app.post("/placement/job/:jobId/:stuId",(req,res)=>{
  Job.findByIdAndUpdate({_id:req.params.jobId},{allocatedTo : req.params.stuId},(function(err,job){
    if(err) res.send(err);
    else{
      Student.findById({_id : req.params.stuId},function(err,student){
        if(err) res.send(err);
        else{
          Student.findByIdAndUpdate({_id : req.params.stuId},{placement : req.params.jobId},(function(err,UpdateStu){
            if(err) res.send(err);
            else{
              res.send(UpdateStu);
            }
          }))
        }
      })
    }
  }))
})
