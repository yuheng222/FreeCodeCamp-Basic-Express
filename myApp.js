var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// --> 7)  Mount the Logger middleware here
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.use(function logger(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  // Call the next function in line:
  next();
});

// --> 11)  Mount the body-parser middleware  here
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 1) Meet the node console. */
console.log("Hello World")

/** 2) A first working Express Server */
// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 3) Serve an HTML file */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/** 5) serve JSON on a specific route */
app.get("/json", function(req, res) {
  let response = {"message": "Hello json"};
    if (process.env.MESSAGE_STYLE == "uppercase") {
      response.message = response.message.toUpperCase()
    } 
  res.json(response)
});

/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.json({time: req.time});
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({echo: req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name', function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({name: `${firstName} ${lastName}`});
});

/** 12) Get data form POST  */
app.post('/name', function(req, res) {
  var firstName = req.body.first;
  var lastName = req.body.last;
  res.json({name: `${firstName} ${lastName}`});
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
