const mongoose = require('mongoose');

module.exports = function dbConnection(mongoUrl) {
    var db = process.env.MONGO_DB_URL || ('mongodb://localhost/greetingsApp')
    mongoose.connect(db, function(err) {
        if (err) {
            console.log(err);

        } else {
            console.log('db Connection successful');
        }
    });

    const NameSchema = mongoose.Schema({
        name: String,
        Counter: Number
    });

    NameSchema.index({
        name: 1
    }, {
        unique: true
    });

    const Name = mongoose.model('Name', NameSchema);
    const newUser = new Name({ name : greet, Counter : userCounts })
    return {

        dbConnection

    };
}
