const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greetings";
const Models = require("./models");
const models = Models(mongoURL);


var app = express();
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());

//set up the engine
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: "handlebars"
}));
app.use(express.static("public"));
app.use(express.static("views"))
app.use(form.urlencoded({
    extended: true
}));
app.set("view engine", "handlebars")

app.get("/", function(req, res) {
    res.render("home");
});

app.post("/", function(req, res, next) {
    var greet = req.body.name;
    var language = req.body.language;
    var greetedName = "";

    if (language === "isixhosa") {
        greetedName = "Molo, " + greet;

    } else if (language === "english") {
        greetedName = "Hello, " + greet;

    } else if (language === "sotho") {
        greetedName = "Dumela, " + greet;
    }
    models.Name.findOne({
        name: greet
    }, function(err, results) {
        if (err) {
            console.log(err);

        } else {
            if (!results) {
                models.Name.create({
                    name: greet,
                    counter: 1
                }, function(err, user) {
                    if (err = '11000') {
                        req.flash("err_mesg", "hey! wellcome back :)");
                    }
                    models.Name.find({}, function(err, results) {
                        if (err) {
                            return next(err);
                        } else {
                            res.render("home", {
                                greetingMsg: greetedName,
                                count: results.length
                            });
                            console.log(results.length);
                        }
                    });

                })
            } else {

                results.counter += 1;
                results.save(function(err, results) {
                    if (err) {
                        return next(err);
                    } else {
                      req.flash("err_mesg", "hey! wellcome back :)");
                        res.render("home", {
                            greetingMsg: greetedName,
                            count: results.length
                        });

                    }
                });

            }
        }


    })

});

//display all the names from the database
app.get('/greeted', function(req, res, next) {

    models.Name.find({}, function(err, results) {
        if (err) {
            return next(err);
        } else {
            res.render("greeted", {
                greeted: results

            });

        }

    });
});

//view count per person using a link
app.get("/greeted/:name", function(req, res) {
    var name = req.params.name;
    models.Name.findOne({
        name: name
    }, function(error, results) {
        if (error) {
            // console.log(error);
        } else{

            res.render("greetedCounter", {
                name: results.name,
                nameCount: results.counter
            })

        }
    })

})


//reseting data from the database
app.post('/reset', function(req, res) {
    models.Name.remove({}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            return data;
        }

    })
});

app.set('port', (process.env.PORT || 5000));

app.use(function(err, req, res, next) {
    res.status(500).send(err.stack)
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port' + app.get('port'));

});
