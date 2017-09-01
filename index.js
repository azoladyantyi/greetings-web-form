const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
var app = express();


// seting rendering engine
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: "handlebars"
}));
app.use(express.static("public"));
app.use(form.urlencoded({
    extended: false
}));
app.set("view engine", "handlebars")

app.get("/", function(req, res) {
    res.render("home");
});
var list = [];
var greeted = "";
app.post("/", function(req, res) {
    var greet = req.body.name;
    var language = req.body.language;
    if (language === "isixhosa") {
        greeted = "Molo, " + greet;
    } else if (language === "english") {
        greeted = "Hello, " + greet;
    } else if (language === "sotho") {
        greeted = "Dumela, " + greet;
    }
    res.render("home", {
        greetingMsg: greeted
    });
     list.push(greet);
});

// console.log('listGreeted');
app.get('/greeted', function(req, res) {
    res.render('greeted', {
      greetedPeeps : list
    });
});

//start the server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
