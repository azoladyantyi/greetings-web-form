const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
var app = express();


// seting rendering engine
app.engine("handlebars",exphbs({
  defaultLayout:"main",
  extname:"handlebars"
}));
app.use(express.static("public"));
app.use(form.urlencoded({
  extended:false
}));
app.set("view engine", "handlebars")

app.get("/",function(req,res) {
  res.render("home");
});
app.post("/",function(req,res){
  var greet ='Hello ' + req.body.name
  res.render('home', {
    greetingMsg: greet
  });
});



//start the server
      var server = app.listen(3000, function() {
          var host = server.address().address;
          var port = server.address().port;

          console.log('Example app listening at http://%s:%s', host, port);
      });
