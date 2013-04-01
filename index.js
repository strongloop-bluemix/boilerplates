var config = require('./config.json');
var asteroid = require('asteroid');
var app = asteroid();

app.init(function (err) {
  if(err) throw err;
  
  app.listen(process.env.PORT || app.config.port || 3000);
});