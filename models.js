const mongoose = require('mongoose');

module.exports = function (mongoURL) {
  mongoose.connect(mongoURL);
  const greetedNameSchema = mongoose.Schema({
    name: String,
    counter: Number
  })
  
  const Name = mongoose.model("Name", greetedNameSchema)

  return {
    Name
  }

}
