//require express library
var express = require('express');
var app = express();

var mongoose = require('mongoose');
//require the express router
// var router = app.Router();
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = '../uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');

var config = require('./config');

//create a cors middleware
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET home page. */

app.get('/', function(req, res, next) {
// render the index page, and pass data to it.
  res.render('index', { title: 'Express' });
});

//our file upload function.
app.post('/', function (req, res, next) {
    console.log("In the Server Post function.");
    console.log("Still in the Server Post function.");
     var path = '';
     console.log('Past the path.');
     upload(req, res, function (err) {
       console.log('Inside the upload function within Post.');
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }
        console.log('Past the upload If section.');
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+ req.file.filename);
  });
})

// CONNECTIONS
// var port: number = process.env.PORT || 8000;
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);

mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at ', mongoURI);
  app.listen(config.PORT, function() {
    console.log('Listening on port ', config.PORT);
  });
});
