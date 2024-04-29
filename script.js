var express = require("express");
var env = require("dotenv").config();
var ejs = require("ejs");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

mongoose.connect(
  "mongodb://0.0.0.0:27017/sampregistration",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, "views")));

// Route to serve index_Main.html as the initial page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index_Main.html"));
});

app.get("/views/login", (req, res) => {
  res.render("login");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/isamp", (req, res) => {
  res.render("isamp");
});
app.get("/dsamp", (req, res) => {
  res.render("dsamp");
});
// app.get("/index_Main.html", (req, res) => {
//   res.render("index_main.html");
// });

var index = require("./routes/index");
app.use("/", index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is started on http://127.0.0.1:" + PORT);
});

// document.addEventListener("DOMContentLoaded", function() {
//   const images = ['/images/backimg1.jpg', '/images/backimg2.jpg' , '/images/backimg3.jpg']; // Add more image paths as needed
//   let index = 0;

//   const frontPageHeading = document.getElementById('front-page-heading');
//   const frontPageText = document.getElementById('front-page-text');

//   setInterval(() => {
//       document.querySelector('.front-page').style.backgroundImage = `url(${images[index]})`;
//       index = (index + 1) % images.length;

//   }, 5000);
// });

// document.addEventListener("DOMContentLoaded", function() {
//   const toggleButtons = document.querySelectorAll(".toggle-answer");

//   toggleButtons.forEach(button => {
//       button.addEventListener("click", function() {
//           const answer = this.previousElementSibling;
//           answer.style.display = answer.style.display === "none" ? "block" : "none";
//           this.textContent = this.textContent === "+" ? "-" : "+";
//       });
//   });
// });

// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// function openNewPage() {
//   window.open("views/index.js", "_self");
// }
// function toggleMenu() {
//   var navLinks = document.querySelector(".nav-links");
//   navLinks.classList.toggle("active");
// }

// //for active home and about*****************
// // Get the "Home" and "About" links
// const homeLink = document.querySelector(".nav-links li:nth-child(2) a");
// const aboutLink = document.querySelector(".nav-links li:nth-child(3) a");

// // Add click event listener to the "Home" link
// homeLink.addEventListener("click", function (event) {
//   // Prevent default behavior of link
//   event.preventDefault();

//   // Remove 'active-link' class from all links
//   document.querySelectorAll(".nav-links a").forEach((link) => {
//     link.classList.remove("active-link");
//   });

//   // Add 'active-link' class to the "Home" link
//   this.classList.add("active-link");
// });

// // Add click event listener to the "About" link
// aboutLink.addEventListener("click", function (event) {
//   // Prevent default behavior of link
//   event.preventDefault();

//   // Remove 'active-link' class from all links
//   document.querySelectorAll(".nav-links a").forEach((link) => {
//     link.classList.remove("active-link");
//   });

//   // Add 'active-link' class to the "About" link
//   this.classList.add("active-link");
// });

function openNewPageofIsamp() {
  window.open("isamp.html", "_self");
}
function openNewPageofDsamp() {
  window.open("dsamp.html", "_self");
}
function openNewPage() {
  window.location.href = "index_Main.html";
}
