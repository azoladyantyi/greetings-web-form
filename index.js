const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.send('greetings')
});

const port = 3000;

app.listen(port, function () {
  console.log('Web app started on port :' + port);
});
