// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var reservations = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  }
];

var waitList = [
  {
    routeName: "greedo",
    name: "Greedo",
    role: "Scumbag",
    age: 250,
    forcePoints: 0
  },
  {
    routeName: "darthvader",
    name: "Darth Vader",
    role: "Dark Lord",
    age: 55,
    forcePoints: 2400
  },
  {
    routeName: "darkprincexizor",
    name: "Dark Prince Xizor",
    role: "Crime Lord",
    age: 55,
    forcePoints: 0
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "hot.restaurant.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Show the list of table reservations
app.get("/api/tables", function(req, res) {  
  return res.json(reservations);
});

// Show the wait list
app.get("/api/waitlist", function(req, res) {  
  return res.json(waitList);
});

app.post("/api/clear", function(req, res) {
  reservations = [];
  waitList = [];
});

// Create new reservations - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newReservation = req.body;

  console.log(newReservation);
  if (reservations.length < 5) {
    reservations.push(newReservation);
  } else {
    waitList.push(newReservation);
  }
  

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
