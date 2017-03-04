var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
// var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.originalname + '-' + datetimestamp);
  }
});

var upload = multer({storage: storage}).single('file');

// CONFIG
var config = require('./config');

// SERVICES
// var passport = require('./services/passport');

// POLICIES
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

// EXPRESS
var app = express();

app.use(bodyParser.json());
// app.use(cors());
// app.use(express.static(__dirname + './../public'));
// app.use(session({
//   secret: config.SESSION_SECRET,
//   saveUninitialized: false,
//   resave: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
mongoose.set('debug', true);

// HEADERS
var permitCrossDomainRequests = function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
res.header('Access-Control-Allow-Credentials', 'true');
// some browsers send a pre-flight OPTIONS request to check if CORS is enabled so you have to also respond to that
if ('OPTIONS' === req.method) {
  res.sendStatus(200);
}
else {
  next();
}
};
app.use(permitCrossDomainRequests);
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// MULTER SETTINGS
// app.use(multer({
//   dest: DIR,
//   rename: function (fieldname, filename) {
//     return filename + Date.now();
//   },
//   onFileUploadStart: function (file) {
//     console.log(file.originalname + ' is starting ...');
//   },
//   onFileUploadComplete: function (file) {
//     console.log(file.fieldname + ' uploaded to  ' + file.path + ' is complete!');
//   }
// }));

// ENDPOINTS

//===========Upload Endpoints=========================================
app.get('/upload', function (req, res) {
  res.end('File catcher example');
});
app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    console.log('This is the file being uploaded on server. req.file:  ' + req.filename);
    if (err) {
      return res.end(err.toString());
    }
    console.log('Past the IF statement for file Upload');
    res.end('File is uploaded');
    console.log('The file has been successfully uploaded!');
  });
});

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
