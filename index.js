const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
var mongoose = require('mongoose')
//const myDatabase = require('./models');

var app = express();

// module.exports = function(models) {
//     const showGreez = function(req, res, next) {
//         res.redirect('/')
//     }

// seting rendering engine
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: "handlebars"
}));
app.use(express.static("public"));
app.use(form.urlencoded({
    extended: false
}));

var mongoURL = process.env.MONGO_DB_URL || ('mongodb://localhost/greetingsApp')
mongoose.connection.on('error', function(err) {
console.log('Mongo error : ');
console.log(err);
});

mongoose.connect(mongoURL, function(err){
  if(err){
    console.log('Error connecting to DB' + err);
  }
else {
  console.log('connection to DB is successful');
}
})

var Name = mongoose.model('Name', {
  name : String,
  countName : Number
});

app.set("view engine", "handlebars")

app.get("/", function(req, res) {
    res.render("home");
});

var greetingCounter = 0;
app.post("/greet", function(req, res) {
    var greet = req.body.name;
    var language = req.body.language;

    if (avoidDuplicate.indexOf(greet) === -1) {
        avoidDuplicate.push(greet)
    }
    if (language === "isixhosa") {
        greetedName = "Molo, " + greet;
        greetingCounter++
    } else if (language === "english") {
        greetedName = "Hello, " + greet;
        greetingCounter++
    } else if (language === "sotho") {
        greetedName = "Dumela, " + greet;
        greetingCounter++
    }

var newNames = {
  name: greet,
  countName : 1
}

        Name.findOne({
            name: greet

        }, function(err, results) {
            //console.log greetedPerson);
            // console.log(greetedNames);
            if (!results) {
              Name.create(newNames)
                //return next(err)
                //console.log(err);
            // } else if (greetedNames) {
            //
            //     greetedNames.counter += 1;
            //     greetedNames.save();

            }
            else {
                // console.log(greetedNames);
                Name.create({
                    name: name
                    // Counter: 1
                });
                results.save()
            }

        });

    res.render("home", {
        greetingMsg: greetedName,
        count : greetingCounter
    });
    list.push(greet);
});


var list = [];
var avoidDuplicate = [];
var greeted = "";
// console.log(list);
app.post("/greet", function(req, res) {
    var greet = req.body.name;
    var language = req.body.language;

    if (avoidDuplicate.indexOf(greet) === -1) {
        avoidDuplicate.push(greet)
    }
    if (language === "isixhosa") {
        greetedName = "Molo, " + greet;
    } else if (language === "english") {
        greetedName = "Hello, " + greet;
    } else if (language === "sotho") {
        greetedName = "Dumela, " + greet;
    }

    // myDatabase.save(function(err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('newUser save to the database');
    //     }
    // });
    res.render("home", {
        greetingMsg: greetedName
    });
    list.push(greet);
});

// console.log('listGreeted');
app.get('/greeted', function(req, res) {
    res.render('greeted', {
        greeted: avoidDuplicate

    });
});
app.post('/counter', function(req, res) {
    greeted.counter += 1;
    res.render('counter', {
        counting: userCounts
    });
});

// app.get('/counter', function(req, res) {
//   var greet = req.body.name;
//   var userCounts = {};
//   //loop through all the users
//   list.forEach(function(greet) {
//     //initialize the value in an array
//     if (userCounts[greet] === undefined) {
//       userCounts[greet] = 0;
//     }
//     // increment the counter for each user in the Map
//     userCounts[greet] = userCounts[greet] + 1;
//   });
//
//   //test userCounts using terminal
//   // console.log((userCounts));
//   res.send(greet + "has been greeted " + userCounts[greet] + 'times')
// });
//start the server

app.set('port', (process.env.PORT || 5000));

app.use(function(err, req, res, next){
  res.status(500).send(err.stack)
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));


});
