var config = require('./config.json');
var asteroid = require('asteroid');
var app = asteroid();

app.init(function (err) {
  if(err) throw err;
  
  app.listen(app.config.port || process.env.PORT || 3000);
});



