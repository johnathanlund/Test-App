var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/upload', function(req, res, next){
  console.log("Server Hit");
  // create an incoming form object
  var form = new formidable.IncomingForm();
  console.log('Past Var Form');

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  console.log('Past form.multiples');

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');
  console.log('Past form.uploadDir');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  console.log('Past file rename');

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  console.log('Past logging in any errors.');
  // once all the files have been uploaded, send a response to the client
 form.on('end', function() {
   console.log('In the last function for form.on before res.end');
   res.end('success');
 });

 // parse the incoming request containing the form data
 form.parse(req);
 console.log('past the form.parse');

});

var server = app.listen(3000, function(){
 console.log('Server listening on port 3000');
});
